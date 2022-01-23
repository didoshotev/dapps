const TokenFarm = artifacts.require('TokenFarm.sol');
const DaiToken = artifacts.require('DaiToken.sol');

module.exports = async function(callback) {
    const accounts = await web3.eth.getAccounts();
    const tokenFarm = await TokenFarm.deployed();
    const farmName = await tokenFarm.name();
    console.log(`Farm name: ${farmName}`);
    console.log(`Farm address: `, tokenFarm.address);
    console.log('Investor account', accounts[1]);
    const mDaiToken = await DaiToken.deployed();
    
    const balanceOfInvestor = web3.utils.fromWei(await (await mDaiToken.balanceOf(accounts[1])).toString());
    console.log(`Balance of mock dai tokens: `, balanceOfInvestor);
}