import { ethers } from "ethers";

const Transaction = (props) => {

  const {to, txValue, confirmations, executed, timeExecuted} = props

  const handleConfirmation = async () => {
    console.log(to)
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
      {!executed && (
        <button onClick={handleConfirmation}>Confirm Transaction</button>
      )}
    </div>
  );
}
 
export default Transaction;