import { ethers } from "ethers";
import { useState } from "react";

const RequestWithdrawal = (props) => {
  const { isOpen, handleModal, contract, signer } = props;

  const [recipientAddress, setRecipientAddress] = useState("")
  const [txValue, setTxValue] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(recipientAddress)
    console.log(txValue)

    try {
      if (!contract.runner) {
        console.error("Invalid signer!")
      }

      const tx = await contract.createTransaction(
        recipientAddress,
        ethers.parseEther(txValue),
        "0x"
      )

      console.log(tx.hash)
      console.log(tx)
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <>
      {isOpen && (
        <div>
          <div>
            <h2>Modal title</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="recipient">Recipient</label>
              <input
                type="text" name="recipient"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter recipient address"
                required
              />

              <br />
              <label htmlFor="txValue">ETH amount</label>
              <input
                type="number" name="txValue"
                value={txValue}
                onChange={(e) => setTxValue(e.target.value)}
                placeholder="Enter amount of ETH to withdraw"
                required
              />

              <br />
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