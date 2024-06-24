import { useState } from 'react'
import './ActivateBetCashback.css'
import Button from '../Button/Button'
import { activeBetCashback } from '../../../apis/apis'

function ActivateBetCashback() {
    const [ loading, setloading ] = useState(false)
    const [ formData, setFormData ] = useState({})

    const handleActiveBetCashback = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            const res = await activeBetCashback(formData)
        } catch (error) {
            
        } finally{
            setloading(false)
        }
    }
  return (
    <form className='activateBetCashback' onSubmit={handleActiveBetCashback}>
        <h1>Activate Betting cashback</h1>
        <p>
            With bet cash back get you will be able to upload every of your betting tickets that cut and get rewarded with cash point after they are verified. this cash point can then be redeemed for prizes after reaching the minimium required threshold.
        </p>

        <h3>Tips</h3>
        <ul>
            <li>A maximium of 50 tickets can be uploaded in a day.</li>
            <li>A bet slip code can only be uploaded once</li>
            <li>A service fee of #100 naira will be deducted from user account every day after activating bet cashback</li>
        </ul>
        <small>Deactivating bet cash back can be done at any time</small>

        <div className="btn">
            {
                loading ? (
                    <Button />
                ) : (
                    <button disabled={loading} type='submit' className="button">Activate Cashback</button>
                )
            }   
        </div>
    </form>
  )
}

export default ActivateBetCashback