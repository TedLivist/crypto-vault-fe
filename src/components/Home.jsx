import { timeDiff } from "../../utils/timeCalculation";

const Home = (props) => {

  const { contract, signer } = props;

  const handleClick = async () => {
    console.log(contract)
    const cont = Number(await contract.lastWithdrawal());

    console.log(timeDiff(Date.now(), (cont * 1000)))
  }

  return (
    <>
      <h3>Home</h3>
      <button onClick={handleClick}>Logger</button>
    </>
  );
}
 
export default Home;