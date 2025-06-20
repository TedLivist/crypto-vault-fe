const Transactions = (props) => {

  const { contract, signer } = props

  return (
    <>
      Transactions go here!
      {contract}
      {signer}
    </>
  );
}
 
export default Transactions;