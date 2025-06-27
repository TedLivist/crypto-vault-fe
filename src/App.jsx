import { createContext, useEffect, useMemo, useState } from 'react';
import './App.css'
import Home from './components/Home'

import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/contractDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';

export const Web3Context = createContext()
const provider = new ethers.BrowserProvider(window.ethereum);

function App() {

  const [signer, setSigner] = useState("")
  const [contract, setContract] = useState("")

  useEffect(() => {
    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []);

      const initSigner = await provider.getSigner();
      setSigner(initSigner)
      setContract(new ethers.Contract(contractAddress, contractABI, initSigner));

      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      if (chainId !== '0xaa36a7') { // Sepolia's chainId
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }]
        })
      }
    }

    connectWallet()
  }, [])

  // listen for wallet changes and update signer
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
          setSigner(null);
        } else {
          // reconstruct the contract too after changing the signer
          // so that errors do not carry over to the new signer
          const initSigner = await provider.getSigner();
          setSigner(initSigner)
          setContract(new ethers.Contract(contractAddress, contractABI, initSigner));
        }
      };

      // Add event listener for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup listener on component unmount
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const webContextValue = useMemo(() => 
    ({ contract, signer }),
    [contract, signer]
  )
  
  return (
    // <Home contract={contract} signer={signer} />
    <Web3Context.Provider value={webContextValue}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home contract={contract} signer={signer} />} />

        <Route exact path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
    </Web3Context.Provider>
  )
}

export default App
