const DeffectToken = artifacts.require('DeffectToken.sol');
const DaiToken = artifacts.require('DaiToken.sol');
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (deployer, network, accounts) {
	// Deploy Mock DAI Token
	await deployer.deploy(DaiToken);
	const daiToken = await DaiToken.deployed();

	// Deploy Deffect Token
	await deployer.deploy(DeffectToken);
	const deffectToken = await DeffectToken.deployed();

	// Deploy TokenFarm
	await deployer.deploy(TokenFarm, deffectToken.address, daiToken.address);
	const tokenFarm = await TokenFarm.deployed();
	
	// Transfer some Deffect token to the TokenFarm 
	await deffectToken.transfer(tokenFarm.address, '1000000000000000000000000');

	// Transfer 1000 Mock DAI tokens to investor
	await daiToken.transfer(accounts[1], '1000000000000000000000'); 
};
