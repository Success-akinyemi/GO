import { useEffect, useState } from 'react'
import './CreditUser.css'
import { creditUserWallet } from '../../../apis/apis'
import Button from '../../../Components/Helpers/Button/Button'
import toast from 'react-hot-toast'

function CreditUser({username, userId}) {
    const [ loading, setLoading ] = useState(false)
    const [ amount, setAmount ] = useState()
    const [ formData, setFormData ] = useState({ id: userId, amount: amount })
    useEffect(() => {console.log(formData)}, [formData])

    const handleCreditUser = async (e) => {
        e.preventDefault()
        if(!formData.id){
            toast.error('User Id is required.')
            return
        }
        if(!formData.amount){
            toast.error('Amount is required.')
            return
        }
        try {
            setLoading(true)
            const res = await creditUserWallet(formData)
            if(res.success){
                toast.success(res.data)
                window.location.reload()
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    return (
    <form className='creditUser' onSubmit={handleCreditUser}>
        <div className="inputGroup">
            <input type="text" className='input' disabled defaultValue={username} name="" id="" />
        </div>
        <div className="inputGroup">
            <input type="number" className='input' placeholder='Enter amount to credit user' value={amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} id="amount" />
        </div>
            {
                loading ? (
                    <Button />
                ) : (
                    <div className="btn">
                        <button type='submit' disabled={loading} className="button">Credit user</button>
                    </div>
                )
            }
    </form>
  )
}

export default CreditUser