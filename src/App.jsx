import { useEffect, useState } from 'react';
import './App.css'
import Home from './components/Home'

import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/contractDetails';
import { timeDiff } from '../utils/timeCalculation';

function App() {

  const [signer, setSigner] = useState("")
  const [contract, setContract] = useState("")

  useEffect(() => {
    const connectWallet = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
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
  
  return (
    <>
      <Home
        contract={contract}
        signer={signer}
      />
    </>
  )
}

export default App
