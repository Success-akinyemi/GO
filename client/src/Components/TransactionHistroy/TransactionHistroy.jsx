import { useFetchUserAllTransactions } from '../../hooks/fetch.hooks'
import './TransactionHistroy.css'

function TransactionHistroy() {
  const {} = useFetchUserAllTransactions()
  return (
    <div className='transactionHistroy'>
        <h1 className='headText'>Transaction Histroy</h1>
    </div>
  )
}

export default TransactionHistroy