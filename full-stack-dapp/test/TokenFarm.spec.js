const { assert } = require('chai');

const DaiToken = artifacts.require('DaiToken.sol');
const DeffectToken = artifacts.require('DeffectToken.sol');
const TokenFarm = artifacts.require('TokenFarm.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'Ether');
}


contract('TokenFarm', ([owner, investor]) => {
    let daiToken, deffectToken, tokenFarm;

    before(async () => {
        daiToken = await DaiToken.new();
        deffectToken = await DeffectToken.new();
        tokenFarm = await TokenFarm.new(deffectToken.address, daiToken.address);
        console.log('tokenFarm amount', tokens('1000000'));
        console.log('inverstor', tokens('100'));
        await deffectToken.transfer(tokenFarm.address, tokens('1000000'));
        await daiToken.transfer(investor, tokens('1000'), { from: owner });
    })


    describe('Mock Dai deployment', async () => {

        it('has a name', async () => {
            const name = await daiToken.name();
            assert.equal(name, 'Mock DAI Token');
        })

        it('decimals to equal 18', async () => {
            const decimals = await daiToken.decimals();
            assert.equal(decimals, `18`);
        })
    });

    describe('Deffect deployment', async () => {

        it('has a name', async () => {
            const name = await deffectToken.name();
            assert.equal(name, 'Deffect Token');
        })

        it('decimals to equal 18', async () => {
            const decimals = await daiToken.decimals();
            assert.equal(decimals, `18`);
        })
    });

    describe('Token Farm deployment', async () => {

        it('has a name', async () => {
            const name = await tokenFarm.name();
            assert.equal(name, 'DFT Token Farm');
        })

        it('token has initial tokens', async () => {
            let balance = await (await deffectToken.balanceOf(tokenFarm.address)).toString();
            console.log('Balance: ', balance);
            assert.equal(balance.toString(), tokens('1000000'));
        })
    });

    describe('Test Deffect Token functions', async () => {
        it('approve', async () => {
            const addressToBeApproved = '0x8E435DbDCa78797e84d09d16855416aA3018bf89';
            const res = await deffectToken.approve(addressToBeApproved, 100);
            assert.equal(res.receipt.status, true);
        })
    })

    describe('Stake tokens', async () => {
        it('rewards investor for staking in mDai tokens', async () => {
            let result;

            // check investor balance before investing
            result = await (await daiToken.balanceOf(investor));
            assert.equal(result, tokens('1000'), 'investor Mock DAI wallet balance correct before staking!');
            console.log('balance before transaction: ', result);
        })
    })
})