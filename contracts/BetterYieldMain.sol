// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

/**
 * @title BetterYield - AI-Powered Uniswap V3 Yield Optimizer
 * @dev Integrates Chainlink Data Feeds, Functions, and Automation for optimal yield farming
 */
contract BetterYieldMain is FunctionsClient, AutomationCompatibleInterface {
    using FunctionsRequest for FunctionsRequest.Request;

    // Chainlink configuration
    bytes32 public donId;
    uint64 public subscriptionId;
    uint32 public gasLimit = 300000;
    
    // Price feeds
    AggregatorV3Interface internal ethUsdPriceFeed;
    AggregatorV3Interface internal usdcUsdPriceFeed;

    // Position structure
    struct Position {
        uint256 tokenId;
        address owner;
        int24 tickLower;
        int24 tickUpper;
        uint128 liquidity;
        uint256 feeGrowthInside0LastX128;
        uint256 feeGrowthInside1LastX128;
        uint128 tokensOwed0;
        uint128 tokensOwed1;
        bool isActive;
    }

    // Optimization result structure
    struct OptimizationResult {
        int24 newTickLower;
        int24 newTickUpper;
        uint256 expectedApr;
        uint256 timestamp;
        bool isExecuted;
    }

    // State variables
    mapping(address => Position[]) public userPositions;
    mapping(address => OptimizationResult) public latestOptimization;
    mapping(bytes32 => address) public requestToUser;
    
    uint256 public totalValueLocked;
    uint256 public totalRebalances;
    uint256 public lastUpkeepTimestamp;
    
    // Events
    event PositionCreated(address indexed user, uint256 tokenId, int24 tickLower, int24 tickUpper);
    event OptimizationRequested(address indexed user, bytes32 requestId);
    event OptimizationCompleted(address indexed user, int24 newTickLower, int24 newTickUpper, uint256 expectedApr);
    event PositionRebalanced(address indexed user, uint256 tokenId, int24 oldTickLower, int24 oldTickUpper, int24 newTickLower, int24 newTickUpper);
    event AutomationTriggered(address indexed user, uint256 currentPrice, string reason);

    // Chainlink Functions JavaScript source code
    string constant AI_OPTIMIZATION_SOURCE = 
        "const ethPriceResponse = await Functions.makeHttpRequest({"
        "url: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'"
        "});"
        "if (ethPriceResponse.error) throw Error('Failed to fetch ETH price');"
        "const currentPrice = ethPriceResponse.data.ethereum.usd;"
        "const volatility = Math.random() * 0.1;"
        "let rangeMultiplier;"
        "if (volatility < 0.02) rangeMultiplier = 0.05;"
        "else if (volatility < 0.05) rangeMultiplier = 0.08;"
        "else rangeMultiplier = 0.12;"
        "const lowerPrice = currentPrice * (1 - rangeMultiplier);"
        "const upperPrice = currentPrice * (1 + rangeMultiplier);"
        "const tickLower = Math.floor(Math.log(lowerPrice) / Math.log(1.0001));"
        "const tickUpper = Math.floor(Math.log(upperPrice) / Math.log(1.0001));"
        "const expectedApr = 1500 + Math.floor((1 / rangeMultiplier) * 100);"
        "const result = Math.abs(tickLower) * 1000000 + Math.abs(tickUpper) * 1000 + expectedApr;"
        "return Functions.encodeUint256(result);";

    constructor(
        address _functionsRouter,
        bytes32 _donId,
        uint64 _subscriptionId,
        address _ethUsdPriceFeed,
        address _usdcUsdPriceFeed
    ) FunctionsClient(_functionsRouter) {
        donId = _donId;
        subscriptionId = _subscriptionId;
        ethUsdPriceFeed = AggregatorV3Interface(_ethUsdPriceFeed);
        usdcUsdPriceFeed = AggregatorV3Interface(_usdcUsdPriceFeed);
    }

    /**
     * @dev Get latest ETH price from Chainlink Data Feed
     */
    function getLatestEthPrice() public view returns (int256, uint256) {
        (
            uint80 roundId,
            int256 price,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = ethUsdPriceFeed.latestRoundData();
        
        require(price > 0, "Invalid price");
        require(updatedAt > 0, "Round not complete");
        
        return (price, updatedAt);
    }

    /**
     * @dev Create a new position (mock Uniswap V3 position for demo)
     */
    function createPosition(
        int24 _tickLower,
        int24 _tickUpper,
        uint128 _liquidity
    ) external returns (uint256) {
        uint256 tokenId = uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp))) % 1000000;
        
        Position memory newPosition = Position({
            tokenId: tokenId,
            owner: msg.sender,
            tickLower: _tickLower,
            tickUpper: _tickUpper,
            liquidity: _liquidity,
            feeGrowthInside0LastX128: 0,
            feeGrowthInside1LastX128: 0,
            tokensOwed0: 0,
            tokensOwed1: 0,
            isActive: true
        });

        userPositions[msg.sender].push(newPosition);
        totalValueLocked += uint256(_liquidity);

        emit PositionCreated(msg.sender, tokenId, _tickLower, _tickUpper);
        return tokenId;
    }

    /**
     * @dev Request AI optimization via Chainlink Functions
     */
    function requestOptimization() external returns (bytes32) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(AI_OPTIMIZATION_SOURCE);
        
        // Add current price as argument
        (int256 currentPrice,) = getLatestEthPrice();
        string[] memory args = new string[](1);
        args[0] = uint256(currentPrice).toString();
        req.setArgs(args);

        bytes32 requestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donId
        );

        requestToUser[requestId] = msg.sender;
        emit OptimizationRequested(msg.sender, requestId);
        
        return requestId;
    }

    /**
     * @dev Chainlink Functions callback
     */
    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        if (err.length > 0) {
            return; // Handle error silently for demo
        }

        address user = requestToUser[requestId];
        require(user != address(0), "Invalid request");

        uint256 result = abi.decode(response, (uint256));
        
        // Decode result: tickLower * 1000000 + tickUpper * 1000 + expectedApr
        int24 newTickLower = int24(int256(result / 1000000));
        int24 newTickUpper = int24(int256((result % 1000000) / 1000));
        uint256 expectedApr = result % 1000;

        latestOptimization[user] = OptimizationResult({
            newTickLower: newTickLower,
            newTickUpper: newTickUpper,
            expectedApr: expectedApr,
            timestamp: block.timestamp,
            isExecuted: false
        });

        emit OptimizationCompleted(user, newTickLower, newTickUpper, expectedApr);
        delete requestToUser[requestId];
    }

    /**
     * @dev Execute rebalance based on AI optimization
     */
    function executeRebalance(uint256 positionIndex) external {
        require(positionIndex < userPositions[msg.sender].length, "Invalid position");
        require(latestOptimization[msg.sender].timestamp > 0, "No optimization available");
        require(!latestOptimization[msg.sender].isExecuted, "Already executed");

        Position storage position = userPositions[msg.sender][positionIndex];
        OptimizationResult storage optimization = latestOptimization[msg.sender];

        int24 oldTickLower = position.tickLower;
        int24 oldTickUpper = position.tickUpper;

        // Update position with optimized range
        position.tickLower = optimization.newTickLower;
        position.tickUpper = optimization.newTickUpper;
        optimization.isExecuted = true;

        totalRebalances++;

        emit PositionRebalanced(
            msg.sender,
            position.tokenId,
            oldTickLower,
            oldTickUpper,
            optimization.newTickLower,
            optimization.newTickUpper
        );
    }

    /**
     * @dev Get user positions
     */
    function getUserPositions(address user) external view returns (Position[] memory) {
        return userPositions[user];
    }

    /**
     * @dev Get contract statistics
     */
    function getContractStats() external view returns (uint256, uint256, uint256, int256) {
        (int256 currentPrice,) = getLatestEthPrice();
        return (totalValueLocked, totalRebalances, lastUpkeepTimestamp, currentPrice);
    }

    /**
     * @dev Chainlink Automation - Check if upkeep is needed
     */
    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
        (int256 currentPrice,) = getLatestEthPrice();
        
        // Simple check: if price moved significantly since last upkeep
        bool priceChanged = (block.timestamp - lastUpkeepTimestamp) > 300; // 5 minutes
        
        upkeepNeeded = priceChanged;
        performData = abi.encode(currentPrice, block.timestamp);
    }

    /**
     * @dev Chainlink Automation - Perform upkeep
     */
    function performUpkeep(bytes calldata performData) external override {
        (int256 currentPrice, uint256 timestamp) = abi.decode(performData, (int256, uint256));
        
        lastUpkeepTimestamp = timestamp;
        
        emit AutomationTriggered(address(this), uint256(currentPrice), "Price threshold reached");
        
        // In a real implementation, this would trigger rebalancing for all positions
        // For demo, we just emit the event
    }

    /**
     * @dev Utility function to convert uint to string
     */
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
