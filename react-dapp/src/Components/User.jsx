import { useState } from "react";
import { ethers } from 'ethers';
import Token from '../artifacts/contracts/Token.sol/Token.json';

const tokenAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016";

const User = () => {
    const [userAccount, setUserAccount] = useState('');
    const [amount, setAmount] = useState(0);

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function getBalance() {
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            console.log(account);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
            const balance = await contract.balanceOf(account);
            console.log('Balance: ', balance.toString());
            try {
                const data = await contract
            } catch (error) {
                console.log('Error occured in User.jsx', error);
            }

        }
    }

    async function sendCoins() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract(tokenAddress, Token.abi, signer);
            const transaction = await tokenContract.transfer(userAccount, amount);
            await transaction.wait();
            console.log(`${amount} Coins successfully sent to ${userAccount}`);
        }
    }

    return (
        <>
            <h3>Amount DFT you have {amount}</h3>
            <button onClick={getBalance}>Get Balance</button>
            <h5>Send Coins</h5>
            <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
            <input onChange={e => setAmount(e.target.value)} placeholder="Amount" type="number" />
            <button onClick={sendCoins}>Send Coins</button>
        </>
    )
}

export default User;