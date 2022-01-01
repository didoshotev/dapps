import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';
import { useEffect, useState } from 'react';
import User from './Components/User';
require('dotenv').config()

const greeterAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508";
const tokenAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016";

function App() {
	const [greeting, setGreeting] = useState('');
	const [greetingMsg, setGreetingMsg] = useState('');
	
	const [userAccount, setUserAccount] = useState('');
	const [amount, setAMount] = useState(0);
	// console.log(ethers);
	async function requestAccount() {
		await window.ethereum.request({ method: 'eth_requestAccounts' });
	}

	async function fetchGreeting() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
			try {
				const data = await contract.greet();
				console.log(data);
				setGreetingMsg(data);
			} catch (err) {
				console.log("Error", err);
			}
		}
	}

	async function RPCConnect() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.JsonRpcProvider();
			const signer = provider.getSigner();
			const blockNumber = await provider.getBlockNumber();
			const balance = await provider.getBalance(greeterAddress);
			const fixedBalance = ethers.utils.formatEther(balance);
			const wallet = ethers.Wallet.createRandom();

			console.log('blockNumber', blockNumber);
			console.log('balance', fixedBalance);
			console.log('wallet', wallet);
		}
	}


	async function setNewGreeting() {

		if (!greeting) { return }
		if (typeof window.ethereum !== 'undefined') {
			const reqAcc = await requestAccount();
			console.log(reqAcc);

			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
			const transaction = await contract.setGreeting(greeting);
			// console.log(transaction);
			setGreeting('');
			const result = await transaction.wait();
			// console.log('res from transaction', result);
			fetchGreeting();
		}
	}

	async function testToken() {
		if(typeof window.ethereum !== 'undefined') { 
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const tokenContract = new ethers.Contract(tokenAddress, Token.abi, provider);
			console.log('tokenContract:');
			console.log(tokenContract);
			const owner = await tokenContract.owner();
			console.log(owner);
			try {
				const balance = await tokenContract.balanceOf(owner);
				const ethBalance = ethers.utils.formatEther(balance);
				
				const supply = await tokenContract.totalSupply(); 
				const supplyFormatted = await ethers.utils.formatEther(supply)

				const symbol = await tokenContract.symbol();
				console.log('token symbol', symbol);
			} catch (error) {
				console.log('Error occured \n', error);
			}
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				{greetingMsg !== "" ?
					<h5>Greeting message: {greetingMsg}</h5>
					:
					<h2>Nothing to show</h2>
				}

				<div>
				</div>
				<button onClick={testToken}>test token</button>
				<button onClick={fetchGreeting}>Fetch Greeting</button>
				<button onClick={setNewGreeting}>Set Greeting</button>
				<input onChange={e => setGreeting(e.target.value)} placeholder="Set greeting" value={greeting} />
				<img src={logo} className="App-logo" alt="logo" />
				<h4>User info</h4>
				<User />
			</header>
		</div>
	);
}

export default App;
