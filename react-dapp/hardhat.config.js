require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
console.log('in config');
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: { 
    artifacts: './src/artifacts',
  },
  networks: { 
    hardhat: { 
      chainId: 1337
    },
    ropsten: { 
      url: 'https://ropsten.infura.io/v3/71e5a9b9db0e42d4bcda7ee63e80f56a',
      accounts: [`0x${process.env.REACT_APP_ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
