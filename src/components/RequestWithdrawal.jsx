import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "../styling/RequestWithdrawal.css"

const RequestWithdrawal = (props) => {
  const { isOpen, handleModal, contract } = props;

  const [recipientAddress, setRecipientAddress] = useState("")
  const [txValue, setTxValue] = useState(0);
  const [error, setError] = useState("")

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

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
      console.error(e.reason)
      setError(e.reason)
    }
    
  }
  
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">Modal title</h2>
              <button className="modal-close" onClick={handleModal}>x</button>
            </div>
            <div className="modal-content">
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="recipient">Recipient</label>
                  <input
                    className="form-input"
                    type="text" name="recipient"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="Enter recipient address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="txValue">ETH amount</label>
                  <input
                    className="form-input"
                    type="number" name="txValue"
                    value={txValue}
                    onChange={(e) => setTxValue(e.target.value)}
                    placeholder="Enter amount of ETH to withdraw"
                    required
                  />
                </div>

                {(error) && (
                  <p className="error-message">{error}</p>
                )}
                <button className="form-submit">Queue withdrawal</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RequestWithdrawal;