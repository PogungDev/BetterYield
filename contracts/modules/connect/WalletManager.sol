// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../core/VaultStorage.sol";

/**
 * @title WalletManager
 * @dev Manages user registration and wallet connections
 *      Deployed Address: 0x3456789012345678901234567890123456789012
 *      Connected to CONNECT TAB
 */
contract WalletManager {
    VaultStorage public immutable vaultStorage;
    
    struct UserProfile {
        address walletAddress;
        uint256 registeredAt;
        uint256 totalPositions;
        uint256 totalValue;
        bool isActive;
    }
    
    mapping(address => UserProfile) public userProfiles;
    mapping(address => bool) public registeredUsers;
    
    event UserRegistered(address indexed user, uint256 timestamp);
    event UserProfileUpdated(address indexed user);
    
    constructor(address _vaultStorage) {
        vaultStorage = VaultStorage(_vaultStorage);
    }
    
    /**
     * @dev Register a new user (called by CONNECT tab)
     * @param _user User wallet address
     */
    function registerUser(address _user) external returns (bool) {
        require(_user != address(0), "Invalid address");
        
        if (!registeredUsers[_user]) {
            userProfiles[_user] = UserProfile({
                walletAddress: _user,
                registeredAt: block.timestamp,
                totalPositions: 0,
                totalValue: 0,
                isActive: true
            });
            
            registeredUsers[_user] = true;
            emit UserRegistered(_user, block.timestamp);
        }
        
        return true;
    }
    
    function getUserProfile(address _user) external view returns (UserProfile memory) {
        return userProfiles[_user];
    }
    
    function updateUserStats(address _user) external {
        require(registeredUsers[_user], "User not registered");
        
        uint256[] memory positions = vaultStorage.getUserPositions(_user);
        userProfiles[_user].totalPositions = positions.length;
        
        // Calculate total value (simplified)
        uint256 totalValue = 0;
        for (uint256 i = 0; i &lt; positions.length; i++) {
            VaultStorage.PositionDetails memory pos = vaultStorage.getPosition(positions[i]);
            totalValue += pos.liquidity; // Simplified calculation
        }
        userProfiles[_user].totalValue = totalValue;
        
        emit UserProfileUpdated(_user);
    }
}
