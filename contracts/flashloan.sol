pragma solidity ^0.5.0;

import '../aave/ILendingPoolAddressesProvider.sol';
import '../aave/ILendingPool.sol';
import "../aave/FlashLoanReceiverBase.sol";
import "../aave/ILendingPoolParametersProvider.sol";

contract FlashLoan is FlashLoanReceiverBase {
    ILendingPoolAddressesProvider provider;
    address dai;

    constructor(address _dai, address _provider) public {
        dai = _dai;
        provider = ILendingPoolAddressesProvider(_provider);
    }

    function startLoan(uint amount, bytes calldata _params) external {
        address lendingPoolAddress = provider.getLendingPool();
        ILendingPool lendingPool = ILendingPool(lendingPoolAddress);
        lendingPool.flashLoan(address(this), dai, amount, _params);
    }

    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
    )
        external
    {
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance, was the flashLoan successful?");

        //
        // do your thing here
        //

        // Time to transfer the funds back
        uint totalDebt = _amount.add(_fee);
        transferFundsBackToPoolInternal(_reserve, totalDebt);
    }

    function checkAaveFees() external returns(uint256, uint256) {
        address parametersProviderAddress = provider.getLendingPoolParametersProvider();
        ILendingPoolParametersProvider parametersProvider = ILendingPoolParametersProvider(parametersProviderAddress);

        (uint256 totalFeeBips, uint256 protocolFeeBips) = parametersProvider
            .getFlashLoanFeesInBips();

        return(totalFeeBips, protocolFeeBips);
    }

}