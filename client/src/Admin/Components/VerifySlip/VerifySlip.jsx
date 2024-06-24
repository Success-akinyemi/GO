import toast from 'react-hot-toast'
import './VerifySlip.css'
import { useState } from 'react'
import { VerifyBetSlipCode } from '../../../apis/apis'

function VerifySlip({betSlipId, betUserId}) {
    const [ loading, setLoading ] = useState(false)
    const [ formData, setFormData ] = useState({ userId: betUserId, slipId: betSlipId })

    const handleBetVerification = async (e) => {
        e.preventDefault()
        if(!betSlipId){
            toast.error('Please provide the bet slip id')
            return
        }
        if(!betUserId){
            toast.error('Please provide the bet user id')
            return
        }

        const confirm = window.confirm(`Are you sure you want to confirm bet: ${betSlipId} slip fro user?`)
        if(confirm){
            try {
                setLoading(true)
                const res = await VerifyBetSlipCode(formData)
                console.log('RESPO', res)
                if(res.success){
                    toast.success(res.data)
                    window.location.reload()
                }
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
    }
  return (
    <form onSubmit={handleBetVerification} className='verifySlip'>
        <div>
            <h2>Bet Slip ID:</h2>
            <p>{betSlipId}</p>
        </div>
        <div>
            <h2>User ID:</h2>
            <p>{betUserId}</p>
        </div>
        <div className="btn">
            <button disabled={loading} className="button">
                Verify Slip
            </button>
        </div>
        {console.log(betSlipId, betUserId)}
    </form>
  )
}

export default VerifySlip