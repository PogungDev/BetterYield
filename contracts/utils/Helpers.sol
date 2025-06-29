// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Helpers
 * @dev Utility functions for BetterYield contracts
 */
library Helpers {
    /**
     * @dev Convert uint to string
     */
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

    /**
     * @dev Calculate percentage
     */
    function calculatePercentage(uint256 _value, uint256 _total) internal pure returns (uint256) {
        if (_total == 0) return 0;
        return (_value * 10000) / _total; // Returns basis points (1% = 100)
    }

    /**
     * @dev Check if price is in range
     */
    function isPriceInRange(int256 _currentPrice, int24 _tickLower, int24 _tickUpper) internal pure returns (bool) {
        return _currentPrice >= _tickLower && _currentPrice &lt;= _tickUpper;
    }

    /**
     * @dev Generate automation ID
     */
    function generateAutomationId(uint256 _positionId, uint256 _timestamp) internal pure returns (string memory) {
        return string(abi.encodePacked("auto-", uint2str(_positionId), "-", uint2str(_timestamp)));
    }
}
