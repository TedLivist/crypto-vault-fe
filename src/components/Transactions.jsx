import { useContext, useEffect, useState } from "react"
import Transaction from "./Transaction"
import { Web3Context } from "../App"

const Transactions = () => {
  const { contract } = useContext(Web3Context)

  const [transactions, setTransactions] = useState([])
  const [transactionsCount, setTransactionsCount] = useState(0)

  useEffect(() => {
    const handleTransactions = async () => {
      const allTxs = await contract.getTransactions()
      setTransactions(allTxs)

      const txsCount = await contract.getTransactionsCount()
      setTransactionsCount(txsCount)
    }

    handleTransactions()
  })


  return (
    <>
      Transactions go here!
      <div>Total transactions: {transactionsCount}</div>

      {transactions.length > 0 && (
        transactions.map((transaction, index) => (
          <Transaction
            contract={contract}
            key={index}
            index={index}
            to={transaction.to}
            txValue={transaction.txValue}
            executed={transaction.executed}
            confirmations={transaction.confirmations}
            timeExecuted={transaction.timeExecuted}
          />
        ))
      )}
    </>
  );
}
 
export default Transactions;