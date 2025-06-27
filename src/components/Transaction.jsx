import { ethers } from "ethers";
import { timeDiff } from "../../utils/timeCalculation";

const Transaction = (props) => {

  const {
    to, txValue, confirmations, executed, timeExecuted,
    contract, index
  } = props

  const handleConfirmation = async () => {
    try {
      if (!contract.runner) {
        console.error("Invalid signer!")
      }

      const tx = await contract.confirmTransaction(index)

      console.log(tx.hash)
      console.log(tx)
    } catch (e) {
      console.error(e)
    }
  }

  const handleExecution = async () => {
    try {
      if (!contract.runner) {
        console.error("Invalid signer!")
      }

      const tx = await contract.executeTransaction(index)

      console.log(tx.hash)
      console.log(tx)
    } catch (e) {
      console.error(e)
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

    </div>
  );
}
 
export default Transaction;