import { useState } from "react";
import { timeDiff } from "../../utils/timeCalculation";
import RequestWithdrawal from "./RequestWithdrawal";

const Home = (props) => {

  const { contract, signer } = props;
  const [lastWithdrawal, setLastWithdrawal] = useState("")
  const [delay, setDelay] = useState("")
  const [owners, setOwners] = useState([])
  const [reqConfirmations, setReqConfirmations] = useState(0)

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    console.log(contract)
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

  const handleModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <h3>Home</h3>
      <button onClick={handleClick}>Logger</button>
      {lastWithdrawal && <p>The last withdrawal was: {lastWithdrawal} </p>}
      {!lastWithdrawal && <p>Loading...</p>}

      <div>
        Withdrawal delay: <span>{delay} hours</span>
      </div>

      <div>
        Required confirmations {reqConfirmations}
      </div>
      
      <div>
        <h3>Owners</h3>
        <p>{owners[0]}</p>
        <p>{owners[1]}</p>
        <p>{owners[2]}</p>
        <p>{owners[3]}</p>
      </div>

      <button onClick={handleModal}>Request withdrawal</button>
      <RequestWithdrawal isOpen={isOpen} handleModal={handleModal} contract={contract} signer={signer} />

      <div>
        {console.log(owners)}
        {console.log((signer.address))}
      </div>
    </>
  );
}
 
export default Home;