import { useState } from 'react'
import './AddFunds.css'
import Button from '../Helpers/Button/Button'
import toast from 'react-hot-toast'
import { monnifyFunding } from '../../apis/apis'

function AddFunds() {
    const [ amount, setAmount ] = useState()
    const [ loading, setLoading ] = useState(false)


    const handleFunding = async (e) => {
        e.preventDefault()
        if(amount < 500){
            toast.error('Minimium amount is 500')
            return
        }
        try {
            setLoading(true)
            const res = await monnifyFunding({amount})
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

  return (
    <form className='addFunds' onSubmit={handleFunding}>
        <h1 className="headText">Fund Wallet</h1>

        <div className="inputGroup">
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input" />
        </div>
        <small className='danger'>
            {
                amount && amount < 500 && 'Minimium deposit amount is 500'
            }
        </small>

        {
            loading ? (
                <div className="btn1">
                    <Button />
                </div>
            ) : (
                <div className="btn">
                    <button type='submit' className='button'>Fund</button>
                </div>
            )
        }
    </form>
  )
}

export default AddFunds