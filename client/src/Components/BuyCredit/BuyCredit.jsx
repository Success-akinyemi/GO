import { useEffect, useState } from 'react'
import './BuyCredit.css'
import Button from '../Helpers/Button/Button'
import toast from 'react-hot-toast'
import { buyCredit } from '../../apis/apis'
import { useDispatch } from 'react-redux'

function BuyCredit() {
    const dispatch = useDispatch()
    const [ loading, setLoading ] = useState(false)
    const [ credit, setCredit ] = useState(50)
    const [ amount, setAmount ] = useState()


    const handleBuyCredit = async (e) => {
        e.preventDefault()
        if(credit < 50){
            toast.error('Minimium credit purchase is 50')
            return
        }
        try {
            setLoading(true)
            const res = await buyCredit({credit})
            if(res.data.success){
                console.log('crediti', res)
            }
        } catch (error) {
            
        } finally{
            setLoading(false)
        }
    }

    const handleCreditChange = (e) => {
        const value = parseInt(e.target.value, 10)
        setCredit(value)
    }


    useEffect(() => {
        setAmount(credit * 20)
    },[credit])

  return (
    <form className='buyCredit' onSubmit={handleBuyCredit}>
        <p>20 Naira per credit. Minimium number of credit 50</p>
        <div className="inputGroup">
            <input type="number" value={credit} onChange={handleCreditChange} className="input" />
        </div>
        <div className="inputGroup">
            <input type="text" disabled value={amount} className="input" />
        </div>

        {
            loading ? (
                <div className="btn1">
                    <Button />
                </div>
            ) : (
                <div className="btn">
                    <button type='submit' className='button'>Buy Credit</button>
                </div>
            )
        }
    </form>
  )
}

export default BuyCredit