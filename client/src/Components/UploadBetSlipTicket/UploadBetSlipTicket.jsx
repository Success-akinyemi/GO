import { useEffect, useState } from 'react'
import { bettingPlatform } from '../../data/bettingPlatforms'
import Button from '../Helpers/Button/Button'
import './UploadBetSlipTicket.css'
import { newBetSlip } from '../../apis/apis'
import toast from 'react-hot-toast'

function UploadBetSlipTicket() {
    const [ isloading, setIsloading ] = useState(false)
    const [ formData, setFormData ] = useState({})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsloading(true)
            if(!formData.slipId){
                toast.error('Add the ticket slip Id')
                return;
            }
            if(!formData.bettingCompaning){
                toast.error('Choose the betting company')
                return;
            }
            const res = await newBetSlip(formData)
        } catch (error) {
            
        } finally{
            setIsloading(false)
        }
    }
    //useEffect(() => {console.log(formData)}, [formData])
  return (
    <form onSubmit={handleSubmit} className='uploadBetSlipTicket'>
        <div className="inputGroup">
            <label htmlFor="">Enter Bet Slip ticket id</label>
            <input onChange={handleChange} type="text" placeholder='ticket id' id='slipId' />
        </div>
        <div className="inputGroup">
            <label htmlFor="">Select Betting Platform</label>
            <select onChange={handleChange} id='bettingCompaning'>
                <option value="">--Choose a platform--</option>
                {
                    bettingPlatform.map((item, idx) => (
                        <option key={idx} value={item?.platfrom}>{item?.platfrom}</option>
                    ))
                }
            </select>
        </div>
        <div className="inputGroup">
            <label htmlFor="">Enter Bet amount staked</label>
            <input onChange={handleChange} type="number" placeholder='amount staked' id='amountStaked' />
        </div>

        <div className="btn">
            {
                            isloading ? (
                                <Button />
                            ) : (
                                <button disabled={isloading}>{isloading ? 'Checking...' : 'Submit'}</button>
                            )
                        }

        </div>

    </form>
  )
}

export default UploadBetSlipTicket