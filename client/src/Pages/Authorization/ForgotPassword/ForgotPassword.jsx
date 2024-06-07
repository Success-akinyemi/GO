import './ForgotPassword.css'
import { useState } from 'react'
import { PiWavesBold } from 'react-icons/pi'
import Button from '../../../Components/Helpers/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword } from '../../../apis/apis'
import toast from 'react-hot-toast'

function ForgotPassword() {
    const navigate = useNavigate()
    const [ error, setError ] = useState('')    
    const [ isloading, setIsloading ] = useState(false)
    const [ formData, setFormData ] = useState({})
    const handleInputs = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        if(!formData.email){
            toast.error('Enter your Registered email')
            setError('Enter your Registered email')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }
        try {
            setIsloading(true)
            const res = await forgotPassword(formData)
            console.log(res)
            if (res?.success) {
                navigate("/resetEmailSent", {
                  state: { resMsg: `${res?.msg} to ${res?.data}` },
                });
            } 
        } catch (error) {
            
        } finally{
            setIsloading(false)
        }
    }

  return (
    <form onSubmit={handleForgotPassword} className='forgotPassword'>
        <div className="card">
            <div className="mainLogo">
                Go <PiWavesBold className='icon' />
            </div>
            
            <h1 className="title">Forgot Password</h1>

            <div className="line"></div>

            <div className="cardContent">
                <div className="inputGroup">
                    <label>Email</label>
                    <input onChange={handleInputs} placeholder='Enter Registered email address' type="email" id='email'/>
                </div>

                <div className="inputGroup">
                    {
                        isloading ? (
                            <Button />
                        ) : (
                            <button disabled={isloading}>Submit</button>
                        )
                    }
                </div>
            </div>
            <small>Remember password <Link to='/login' className='link'>login</Link> </small>

            <p className='errorText'>
                {error ? error : ''}
            </p>
        </div>
    </form>
  )
}

export default ForgotPassword