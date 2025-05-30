import { useState } from "react";
import { timeDiff } from "../../utils/timeCalculation";

const Home = (props) => {

  const { contract, signer } = props;
  const [lastWithdrawal, setLastWithdrawal] = useState("")

  const handleClick = async () => {
    console.log(contract)
    const cont = Number(await contract.lastWithdrawal());

    const time = (timeDiff(Date.now(), (cont * 1000)))
    setLastWithdrawal(time);

    

  }

  return (
    <>
      <h3>Home</h3>
      <button onClick={handleClick}>Logger</button>
      {lastWithdrawal && <p>The last withdrawal was: {lastWithdrawal} </p>}
      {!lastWithdrawal && <p>Loading...</p>}
    </>
  );
}
 
export default Home;