import { useEffect, useState } from "react";
import { timeDiff } from "../../utils/timeCalculation";
import RequestWithdrawal from "./RequestWithdrawal";
import "../styling/Home.css"

const Home = (props) => {
  const { contract, signer } = props;
  const [lastWithdrawal, setLastWithdrawal] = useState("")
  const [delay, setDelay] = useState("")
  const [owners, setOwners] = useState([])
  const [reqConfirmations, setReqConfirmations] = useState(0)

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const initializeVariables = async () => {
      if(!contract) return // don't run useEffect if contract isn't set

      const cont = Number(await contract.lastWithdrawal());
      const time = (timeDiff(Date.now(), (cont * 1000)))
      setLastWithdrawal(time);

      const delayPeriod = await contract.withdrawalDelay();
      setDelay(Number(delayPeriod)/3600)

      const confirmations = await contract.requiredConfirmations()
      setReqConfirmations(confirmations)

      Promise.all([
        contract.owners(0),
        contract.owners(1),
        contract.owners(2),
        contract.owners(3),
      ]).then((values) => {
        setOwners(values);
      })
    }

    initializeVariables()
  }, [contract, signer])

  const handleModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="homepage">
      {/* <button onClick={handleClick}>Logger</button> */}
      
      <div className="status-grid">
        <div className="status-card">
          <div className="config-item">
            {lastWithdrawal && (
              <p className="config-label">
                The last withdrawal was: <span className="withdrawal-value">{lastWithdrawal}</span>
              </p>
            )}
            {!lastWithdrawal && <p className="loading-text">Loading...</p>}
          </div>
        </div>

      <div className="status-card">
        <div className="config-item">
          <span className="config-label">Withdrawal delay</span>
          <span className="config-value">
            {delay}<span className="config-unit">hours</span>
          </span>
        </div>
      </div>

      <div className="status-card">
        <div className="config-item">
          <span className="config-label">Required confirmations</span>
          <span className="config-value">{reqConfirmations}</span>
        </div>
      </div>
    </div>
      
    <div className="owners-section">
      <h3 className="owners-title">Owners</h3>
      <div className="owners-grid">
        <div className="owner-item">{owners[0]}</div>
        <div className="owner-item">{owners[1]}</div>
        <div className="owner-item">{owners[2]}</div>
        <div className="owner-item">{owners[3]}</div>
      </div>
    </div>

    <button className="request-button" onClick={handleModal}>
      Request withdrawal
    </button>

      {/* <button onClick={handleModal}>Request withdrawal</button> */}
    <RequestWithdrawal isOpen={isOpen} handleModal={handleModal} contract={contract} signer={signer} />
    </div>
  );
}
 
export default Home;