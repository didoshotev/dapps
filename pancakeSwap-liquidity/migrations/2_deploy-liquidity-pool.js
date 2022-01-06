const Factory = artifacts.require('Factory.sol');
const Router = artifacts.require('Router.sol');
const Pair = artifacts.require('Pair.sol');
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');

const PANCAKESWAP_CONTRACTS_TESTNET = { }
PANCAKESWAP_CONTRACTS_TESTNET.FACTORY = '0x6725F303b657a9451d8BA641348b6761A6CC7a17';
PANCAKESWAP_CONTRACTS_TESTNET.ROUTER = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1';

module.exports = async function (deployer, network, accounts) {
    const [admin, _] = await web3.eth.getAccounts();
    try {
        const factory = await Factory.at(PANCAKESWAP_CONTRACTS_TESTNET.FACTORY); 
        const router = await Router.at(PANCAKESWAP_CONTRACTS_TESTNET.ROUTER);
        
        // might be already deployed
        const token1 = await Token1.new();
        const token2 = await Token2.new();
        // read only transaction so we know the address in advance
        const pairAddress = await factory.createPair.call(token1.address, token2.address);
        const tx = await factory.createPair(token1.address, token2.address);

        // provide initial liquidity
        await token1.approve(router.address, 10000);
        await token2.approve(router.address, 10000);
        await router.addLiquidity(
            token1.address,
            token2.address,
            10000,
            10000,
            10000,
            10000,
            admin,
            
            Math.floor(Date.now() / 1000) + 60 * 10
        );
        const pair = await Pair.at(pairAddress);
        const balance = await pair.balanceOf(admin);
        console.log(`balance LP: ${balance.toString()}`);
    } catch (e) {
        console.log(e);
    }
};
