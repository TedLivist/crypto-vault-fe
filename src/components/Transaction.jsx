import { ethers } from "ethers";

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
    console.log("Haha, execute")
  }

  return (
    <div>
      {to}
      <br/>
      {executed.toString()}
      -------------
      {confirmations}
      -------------
      {timeExecuted}
      -------------
      {ethers.formatEther(Number(txValue).toString())}
      <br/>
      {(!executed && Number(confirmations) < 3) && (
        <button onClick={handleConfirmation}>Confirm Transaction</button>
      )}

      {(!executed && Number(confirmations) >= 3) && (
        <button onClick={handleExecution}>Eexcute Transaction</button>
      )}

    </div>
  );
}
 
export default Transaction;