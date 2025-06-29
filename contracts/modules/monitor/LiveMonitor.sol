// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../core/VaultStorage.sol";

/**
 * @title LiveMonitor
 * @dev Real-time monitoring and statistics for user positions
 *      Deployed Address: 0x7890123456789012345678901234567890123456
 *      Connected to MONITOR TAB
 */
contract LiveMonitor {
    VaultStorage public immutable vaultStorage;
    
    struct AggregatedStats {
        uint256 totalValue;
        uint256 totalPositions;
        uint256 activeStrategies;
        uint256 totalFeesEarned;
        uint256 avgApr;
        uint256 lastUpdated;
    }
    
    struct ActivityLog {
        uint256 positionId;
        string action;
        uint256 timestamp;
        bytes data;
    }
    
    mapping(address => AggregatedStats) public userStats;
    mapping(address => ActivityLog[]) public userActivity;
    
    event StatsUpdated(address indexed user, uint256 totalValue, uint256 activeStrategies);
    event ActivityLogged(address indexed user, uint256 positionId, string action);
    
    constructor(address _vaultStorage) {
        vaultStorage = VaultStorage(_vaultStorage);
    }
    
    /**
     * @dev Get aggregated statistics for a user (called by MONITOR tab)
     * @param _user User address
     */
    function getAggregatedStats(address _user) external view returns (AggregatedStats memory) {
        uint256[] memory positions = vaultStorage.getUserPositions(_user);
        
        uint256 totalValue = 0;
        uint256 activeStrategies = 0;
        uint256 totalFees = 0;
        
        for (uint256 i = 0; i &lt; positions.length; i++) {
            VaultStorage.PositionDetails memory position = vaultStorage.getPosition(positions[i]);
            totalValue += position.liquidity; // Simplified calculation
            totalFees += 50 + (block.timestamp % 100); // Simulated fees
            
            if (position.automated) {
                activeStrategies++;
            }
        }
        
        uint256 avgApr = positions.length > 0 ? 1500 + (block.timestamp % 500) : 0; // 15-20% simulated
        
        return AggregatedStats({
            totalValue: totalValue,
            totalPositions: positions.length,
            activeStrategies: activeStrategies,
            totalFeesEarned: totalFees,
            avgApr: avgApr,
            lastUpdated: block.timestamp
        });
    }
    
    /**
     * @dev Log activity for monitoring
     */
    function logActivity(address _user, uint256 _positionId, string memory _action, bytes memory _data) external {
        userActivity[_user].push(ActivityLog({
            positionId: _positionId,
            action: _action,
            timestamp: block.timestamp,
            data: _data
        }));
        
        emit ActivityLogged(_user, _positionId, _action);
    }
    
    /**
     * @dev Get recent activity for a user
     */
    function getRecentActivity(address _user) external view returns (ActivityLog[] memory) {
        ActivityLog[] memory allActivity = userActivity[_user];
        uint256 maxReturn = 10; // Return last 10 activities
        
        if (allActivity.length &lt;= maxReturn) {
            return allActivity;
        }
        
        ActivityLog[] memory recentActivity = new ActivityLog[](maxReturn);
        uint256 startIndex = allActivity.length - maxReturn;
        
        for (uint256 i = 0; i &lt; maxReturn; i++) {
            recentActivity[i] = allActivity[startIndex + i];
        }
        
        return recentActivity;
    }
    
    /**
     * @dev Update user statistics
     */
    function updateUserStats(address _user) external {
        AggregatedStats memory stats = this.getAggregatedStats(_user);
        userStats[_user] = stats;
        emit StatsUpdated(_user, stats.totalValue, stats.activeStrategies);
    }
}
