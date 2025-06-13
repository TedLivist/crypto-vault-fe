import { useState } from "react";

const RequestWithdrawal = (props) => {
  const { isOpen, handleModal } = props;

  const [recipientAddress, setRecipientAddress] = useState("")
  const [txValue, setTxValue] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(recipientAddress)
    console.log(txValue)
  }

  return (
    <>
      {isOpen && (
        <div>
          <div>
            <h2>Modal title</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text" name="recipient"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter recipient address"
                required
              />

              <input
                type="text" name="txValue"
                value={txValue}
                onChange={(e) => setTxValue(e.target.value)}
                placeholder="Enter amount of ETH to withdraw"
                required
              />

              <button>Queue withdrawal</button>
            </form>

            <button onClick={handleModal}>xx</button>
          </div>
        </div>
      )}
    </>
  );
}
 
export default RequestWithdrawal;