const Web3 = require('web3')
const daiAbi = require('./abi/daiAbi.json')
const flashLoanAbi = require('./abi/flashloanabi.json')

const unlockedAddress = '0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8'
const toAddress = '0x05F63A457470C13B0642973e77d2d143af276287'
const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const flashLoanAddress = '0x4B23F93924ce82Ee7C1525eC9730B1aaDB2b9a0a'

const web3 = new Web3('http://localhost:8545')
const daiContract = new web3.eth.Contract(daiAbi, daiAddress)
const flashLoanContract = new web3.eth.Contract(flashLoanAbi, flashLoanAddress)

async function run () {
  console.log('comecou')
  try {
    const unlockedBalance = await daiContract.methods.balanceOf(unlockedAddress).call()
    const toAddressBalance = await daiContract.methods.balanceOf(toAddress).call()
    console.log('unlockedBalance', unlockedBalance / 1e18)
    console.log('toAddressBalance', toAddressBalance / 1e18)

    // transfer DAI
    await daiContract.methods.transfer(toAddress, (100e18).toString()).send({ from: unlockedAddress })

    const newUnlockBalance = await daiContract.methods.balanceOf(unlockedAddress).call()
    const newToAddressBalance = await daiContract.methods.balanceOf(toAddress).call()
    console.log('newUnlockBalance', newUnlockBalance / 1e18)
    console.log('newToAddressBalance', newToAddressBalance / 1e18)
  } catch (err) {
    console.log('err')
    console.log(err)
  }
}

async function checkBalance () {
  console.log('checkBalance')
  try {
    const daiBalance = await daiContract.methods.balanceOf(toAddress).call()
    console.log('newToAddressBalance', daiBalance / 1e18)
  } catch (err) {
    console.log('err')
    console.log(err)
  }
}

async function checkAaveFee () {
  console.log('checkAaveFee')
  try {
    const [aaveFee, aaveFee2] = await flashLoanContract.methods.checkAaveFees().call()
    console.log('aaveFee', aaveFee)
    console.log('aaveFee2', aaveFee2)
  } catch (err) {
    console.log('err')
    console.log(err)
  }
}

// run()
// checkBalance()
checkAaveFee()
