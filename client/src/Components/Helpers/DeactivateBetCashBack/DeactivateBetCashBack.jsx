import { useState } from 'react'
import './DeactivateBetCashBack.css'
import { deactiveBetCashback } from '../../../apis/apis'
import Button from '../Button/Button'

function DeactivateBetCashBack() {
    const [ loading, setloading ] = useState(false)
    const [ formData, setFormData ] = useState({})


    const handleDeactiveBetCashback = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            const res = await deactiveBetCashback(formData)
        } catch (error) {
            
        } finally{
            setloading(false)
        }
    }
  return (
    <form onSubmit={handleDeactiveBetCashback} className='deactivateBetCashBack'>
        <h1>Are you sure you want to deactivate Bet cashback!</h1>
        <div className="btn">
            {
                loading ? (
                    <Button />
                ) : (
                    <button disabled={loading} className="button">Deactivate Cashback</button>
                )
            }   
        </div>
    </form>
  )
}

export default DeactivateBetCashBack