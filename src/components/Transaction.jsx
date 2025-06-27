import { ethers } from "ethers";
import { timeDiff } from "../../utils/timeCalculation";
import { useState } from "react";
import { useEffect } from "react";

const Transaction = (props) => {
  const {
    to, txValue, confirmations, executed, timeExecuted,
    contract, index
  } = props
  
  const [error, setError] = useState("")
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  const handleConfirmation = async () => {
    try {
      if (!contract.runner) {
        console.error("Invalid signer!")
      }

      const tx = await contract.confirmTransaction(index)

      console.log(tx.hash)
      console.log(tx)
    } catch (e) {
      console.error(e.reason)
      setError(e.reason)
    }
  }

  const handleExecution = async () => {
    setError("")
    try {
      if (!contract.runner) {
        console.error("Invalid signer!")
      }

      const tx = await contract.executeTransaction(index)

      console.log(tx.hash)
      console.log(tx)
    } catch (e) {
      console.error(e.reason)
      setError(e.reason)
    }
  }

  return (
    <div>
      {to}
      <br/>
      {executed.toString()}
      -------------
      {confirmations}
      -------------
      {(timeExecuted <= 0) && (
        <div>
          not executed yet
        </div>
      )}
      {(timeExecuted > 0) && (
        <div>
          {timeDiff(Date.now(), (Number(timeExecuted) * 1000))}
        </div>
      )}
      -------------
      {ethers.formatEther(Number(txValue).toString())}
      <br/>
      {(!executed && Number(confirmations) < 3) && (
        <button onClick={handleConfirmation}>Confirm Transaction</button>
      )}

      {(!executed && Number(confirmations) >= 3) && (
        <button onClick={handleExecution}>Execute Transaction</button>
      )}

      {(executed) && (
        <p>Transaction has been executed</p>
      )}

      {(error) && (
        <p style={{color: 'red'}}>{error}</p>
      )}
    </div>
  );
}

export default Transaction;