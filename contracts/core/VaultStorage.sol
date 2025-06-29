// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VaultStorage
 * @dev Centralized storage for all position data with access control
 *      Deployed Address: 0x2345678901234567890123456789012345678901
 */
contract VaultStorage {
    address public owner;
    mapping(address => bool) public authorizedCallers;
    
    struct PositionDetails {
        address owner;
        address token0;
        address token1;
        uint24 fee;
        int24 tickLower;
        int24 tickUpper;
        uint128 liquidity;
        uint256 lastRebalanceTime;
        uint256 lastCompoundTime;
        bool automated;
        uint256 createdAt;
    }
    
    mapping(uint256 => PositionDetails) public positions;
    mapping(address => uint256[]) public userPositions;
    uint256 public nextPositionId = 1;
    
    event PositionCreated(uint256 indexed positionId, address indexed owner);
    event PositionUpdated(uint256 indexed positionId, string updateType);
    event AuthorizationChanged(address indexed caller, bool authorized);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier onlyAuthorized() {
        require(authorizedCallers[msg.sender] || msg.sender == owner, "Unauthorized");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function addAuthorizedCaller(address _caller) external onlyOwner {
        authorizedCallers[_caller] = true;
        emit AuthorizationChanged(_caller, true);
    }
    
    function removeAuthorizedCaller(address _caller) external onlyOwner {
        authorizedCallers[_caller] = false;
        emit AuthorizationChanged(_caller, false);
    }
    
    function createPosition(
        address _owner,
        address _token0,
        address _token1,
        uint24 _fee,
        int24 _tickLower,
        int24 _tickUpper,
        uint128 _liquidity
    ) external onlyAuthorized returns (uint256) {
        uint256 positionId = nextPositionId++;
        
        positions[positionId] = PositionDetails({
            owner: _owner,
            token0: _token0,
            token1: _token1,
            fee: _fee,
            tickLower: _tickLower,
            tickUpper: _tickUpper,
            liquidity: _liquidity,
            lastRebalanceTime: block.timestamp,
            lastCompoundTime: block.timestamp,
            automated: false,
            createdAt: block.timestamp
        });
        
        userPositions[_owner].push(positionId);
        emit PositionCreated(positionId, _owner);
        return positionId;
    }
    
    function updatePositionTicks(uint256 _positionId, int24 _newTickLower, int24 _newTickUpper) external onlyAuthorized {
        require(positions[_positionId].owner != address(0), "Position not found");
        positions[_positionId].tickLower = _newTickLower;
        positions[_positionId].tickUpper = _newTickUpper;
        positions[_positionId].lastRebalanceTime = block.timestamp;
        emit PositionUpdated(_positionId, "REBALANCE");
    }
    
    function toggleAutomation(uint256 _positionId, bool _automated) external onlyAuthorized {
        require(positions[_positionId].owner != address(0), "Position not found");
        positions[_positionId].automated = _automated;
        emit PositionUpdated(_positionId, "AUTOMATION");
    }
    
    function updateLastCompoundTime(uint256 _positionId) external onlyAuthorized {
        require(positions[_positionId].owner != address(0), "Position not found");
        positions[_positionId].lastCompoundTime = block.timestamp;
        emit PositionUpdated(_positionId, "COMPOUND");
    }
    
    function getPosition(uint256 _positionId) external view returns (PositionDetails memory) {
        return positions[_positionId];
    }
    
    function getUserPositions(address _user) external view returns (uint256[] memory) {
        return userPositions[_user];
    }
}
