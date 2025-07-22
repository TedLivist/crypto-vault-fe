import { ethers } from "ethers";
import { timeDiff } from "../../utils/timeCalculation";
import { useState } from "react";
import { useEffect } from "react";
import "../styling/Transaction.css"

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
    <div className={`transaction-card ${executed ? 'executed' : (Number(confirmations) >= 3) ? 'ready' : 'pending'}`}>
      <div className="transaction-header">
        <div className="transaction-address">{to}</div>
        <div className="transaction-status">
          <div className={`status-badge ${executed ? 'executed' : (Number(confirmations) >= 3) ? 'ready' : 'pending'}`}>
            {executed ? 'Executed' : (Number(confirmations) >= 3) ? 'Ready' : 'Pending'}
          </div>
        </div>
      </div>

      <div className="transaction-info">
        <div className="info-item">
          <div className="info-label">Confirmations</div>
          <div className="confirmations-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(Number(confirmations) / 3) * 100}%` }}
              ></div>
            </div>
            <div className="confirmations-text">{confirmations}/3</div>
          </div>
        </div>

        <div className="info-item">
          <div className="info-label">Amount</div>
          <div className="info-value eth-amount">
            {ethers.formatEther(Number(txValue).toString())}
            <span className="eth-symbol">ETH</span>
          </div>
        </div>
      </div>

      <div className="info-item">
        <div className="info-label">Status</div>
        {(timeExecuted <= 0) && (
          <div className="time-display time-pending">
            Not executed yet
          </div>
        )}
        {(timeExecuted > 0) && (
          <div className="time-display time-executed">
            {timeDiff(Date.now(), (Number(timeExecuted) * 1000))}
          </div>
        )}
      </div>
      
      <div className="transaction-actions">
        {(!executed && Number(confirmations) < 3) && (
          <button className="action-button confirm-button" onClick={handleConfirmation}>
            Confirm Transaction
          </button>
        )}

        {(!executed && Number(confirmations) >= 3) && (
          <button className="action-button execute-button" onClick={handleExecution}>
            Execute Transaction
          </button>
        )}
      </div>

      {(executed) && (
        <div className="status-message executed-message">
          Transaction has been executed
        </div>
      )}

      {(error) && (
        <div className="status-message error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default Transaction;