pragma solidity ^0.5.0;

/**
@title ILendingPool interface
@notice provides the interface to fetch the LendingPoolCore address
 */

contract ILendingPoolParametersProvider {

    function getFlashLoanFeesInBips() external pure returns (uint256, uint256);
}