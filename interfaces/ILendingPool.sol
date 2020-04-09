pragma solidity ^0.5.0;

/**
@title ILendingPool interface
@notice provides the interface to fetch the LendingPoolCore address
 */

contract ILendingPool {

    function flashLoan(address _receiver, address _reserve, uint256 _amount, bytes memory _params)  public;
}