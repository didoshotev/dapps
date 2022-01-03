## Steps in order to reproduce the application
- npm install
- Make sure you have MNEMONIC variable in .env file corresponding to your wallet secret phrase.
- Compile contracts: `truffle compile` 
- Deploy on BSC-Testnet: `truffle exec .\migrations\${nameOfYourFile} --network bscTestnet`
