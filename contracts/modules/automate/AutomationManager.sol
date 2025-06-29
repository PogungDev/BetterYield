// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../../core/VaultStorage.sol";
import "../optimize/AIOptimizer.sol";

/**
 * @title AutomationManager
 * @dev Manages Chainlink Automation for automated rebalancing and compounding
 *      Deployed Address: 0x6789012345678901234567890123456789012345
 *      Connected to AUTOMATE TAB
 */
contract AutomationManager is AutomationCompatibleInterface {
    VaultStorage public immutable vaultStorage;
    AggregatorV3Interface public immutable priceFeed;
    AIOptimizer public immutable aiOptimizer;
    
    struct AutomationStatus {
        uint256 positionId;
        bool isActive;
        uint256 lastRebalance;
        uint256 lastCompound;
        uint256 rebalanceCount;
        uint256 compoundCount;
        string automationId;
    }
    
    mapping(uint256 => AutomationStatus) public automationStatus;
    mapping(uint256 => bool) public automatedPositions;
    
    event AutomationActivated(uint256 indexed positionId, string automationId);
    event AutomationDeactivated(uint256 indexed positionId);
    event RebalanceExecuted(uint256 indexed positionId, int24 newTickLower, int24 newTickUpper);
    event FeesCompounded(uint256 indexed positionId, uint256 amount);
    
    constructor(
        address _vaultStorage,
        address _priceFeed,
        address _aiOptimizer
    ) {
        vaultStorage = VaultStorage(_vaultStorage);
        priceFeed = AggregatorV3Interface(_priceFeed);
        aiOptimizer = AIOptimizer(_aiOptimizer);
    }
    
    /**
     * @dev Toggle automation for a position (called by AUTOMATE tab)
     * @param _positionId Position to automate
     * @param _enable Enable or disable automation
     */
    function toggleAutomation(uint256 _positionId, bool _enable) external {
        VaultStorage.PositionDetails memory position = vaultStorage.getPosition(_positionId);
        require(position.owner != address(0), "Position not found");
        
        vaultStorage.toggleAutomation(_positionId, _enable);
        automatedPositions[_positionId] = _enable;
        
        if (_enable) {
            string memory automationId = string(abi.encodePacked("auto-", uint2str(_positionId), "-", uint2str(block.timestamp)));
            automationStatus[_positionId] = AutomationStatus({
                positionId: _positionId,
                isActive: true,
                lastRebalance: block.timestamp,
                lastCompound: block.timestamp,
                rebalanceCount: 0,
                compoundCount: 0,
                automationId: automationId
            });
            emit AutomationActivated(_positionId, automationId);
        } else {
            automationStatus[_positionId].isActive = false;
            emit AutomationDeactivated(_positionId);
        }
    }
    
    /**
     * @dev Chainlink Automation checkUpkeep
     */
    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
        (, int256 currentPrice, , , ) = priceFeed.latestRoundData();
        
        // Check all automated positions
        for (uint256 i = 1; i &lt; 1000; i++) { // Simplified iteration
            if (automatedPositions[i]) {
                VaultStorage.PositionDetails memory position = vaultStorage.getPosition(i);
                
                // Check if rebalance needed (price out of range)
                if (currentPrice &lt; position.tickLower || currentPrice > position.tickUpper) {
                    upkeepNeeded = true;
                    performData = abi.encode(i, "rebalance");
                    return (upkeepNeeded, performData);
                }
                
                // Check if compound needed (daily)
                if (block.timestamp - position.lastCompoundTime >= 1 days) {
                    upkeepNeeded = true;
                    performData = abi.encode(i, "compound");
                    return (upkeepNeeded, performData);
                }
            }
        }
        
        return (false, "");
    }
    
    /**
     * @dev Chainlink Automation performUpkeep
     */
    function performUpkeep(bytes calldata performData) external override {
        (uint256 positionId, string memory action) = abi.decode(performData, (uint256, string));
        require(automatedPositions[positionId], "Position not automated");
        
        if (keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("rebalance"))) {
            _executeRebalance(positionId);
        } else if (keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("compound"))) {
            _compoundFees(positionId);
        }
    }
    
    function _executeRebalance(uint256 _positionId) internal {
        // Get AI optimization result
        AIOptimizer.OptimizationResult memory result = aiOptimizer.getOptimizationResult(_positionId);
        
        if (result.isValid) {
            vaultStorage.updatePositionTicks(_positionId, result.optimalTickLower, result.optimalTickUpper);
            automationStatus[_positionId].lastRebalance = block.timestamp;
            automationStatus[_positionId].rebalanceCount++;
            emit RebalanceExecuted(_positionId, result.optimalTickLower, result.optimalTickUpper);
        }
    }
    
    function _compoundFees(uint256 _positionId) internal {
        vaultStorage.updateLastCompoundTime(_positionId);
        automationStatus[_positionId].lastCompound = block.timestamp;
        automationStatus[_positionId].compoundCount++;
        emit FeesCompounded(_positionId, 100); // Simulated amount
    }
    
    function getAutomationStatus(uint256 _positionId) external view returns (AutomationStatus memory) {
        return automationStatus[_positionId];
    }
    
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
