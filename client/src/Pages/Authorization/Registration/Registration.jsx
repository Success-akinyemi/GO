import { useEffect, useState } from 'react'
import './Registration.css'
import { PiWavesBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { regieterUsers } from '../../../apis/apis';
import {toast} from 'react-hot-toast'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Button from '../../../Components/Helpers/Button/Button';

function Registration() {
    const navigate = useNavigate()
    const [ error, setError ] = useState('')
    const [ isloading, setIsloading ] = useState(false)
    const [ formData, setFormData ] = useState({})

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [comfirmPasswordVisible, setComfirmPasswordVisible] = useState(false)

    const handleInputs = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        if(!formData.fullName){
            toast.error(`Enter Full name`)
            setError('Enter Full name')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }
        if(!formData.phoneNumber){
            toast.error('Enter Phone Number')
            setError('Enter Phone Number')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }
        if(!formData.email){
            toast.error('Enter Email')
            setError('Enter Email')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }
        if(!formData.password){
            toast.error('Enter Password')
            setError('Enter Password')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }
        if(!formData.ConfirmPassword){
            toast.error('Enter Confirm Password')
            setError('Enter Confirm Password')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }

        const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/
        if(formData.password !== formData.ConfirmPassword){
            toast.error('Password do not match')
            setError('Password do not match')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }

        if(!specialChars.test(formData.password)){
            toast.error('Password must contain at least one special character')
            setError('Password must contain at least one special character')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }

        if(formData.password.length < 6){
            toast.error('Password must be 6 characters long')
            setError('Password must be 6 characters long')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }
        try {
            setIsloading(true)
            const res = await regieterUsers(formData)
            if (res?.success) {
                navigate("/emailVerification", {
                  state: { resMsg: res?.data },
                });
            } 
        } catch (error) {
            
        } finally{
            setIsloading(false)
        }
    }

    const myRegPassword = () => {
        setPasswordVisible((prev) => !prev)
      }
    
    const myRegComfirmPassword = () => {
        setComfirmPasswordVisible((prev) => !prev)
    }
 
  return (
    <form className='registration' onSubmit={handleRegister}>
        <div className="card">
            <div className="mainLogo">
                Go <PiWavesBold className='icon' />
            </div>

            <div className="line"></div>

            <div className="cardContent">
                <div className="inputGroup">
                    <label>Full Name</label>
                    <input type="text" id='fullName' onChange={handleInputs} />
                </div>

                <div className="inputGroup">
                    <label>Phone Number</label>
                    <input type="text" id='phoneNumber' onChange={handleInputs} />
                </div>

                <div className="inputGroup">
                    <label>Email</label>
                    <input type="email" id='email' onChange={handleInputs} />
                </div>

                <div className="inputGroup password">
                    <label>Password</label>
                    <input type={passwordVisible ? 'text' : 'password'}id='password' onChange={handleInputs} />
                    <div className="eyeBox" onClick={myRegPassword}>
                        {passwordVisible ? (
                        <i id='eye-slash'>
                            <FaRegEyeSlash  />
                        </i>
                        ) : (
                        <i id='eye'>
                            <FaRegEye  />
                        </i>
                        )}
                    </div>
                </div>

                <div className="inputGroup password">
                    <label>Confirm Password</label>
                    <input type={comfirmPasswordVisible ? 'text' : 'password'} id='ConfirmPassword' onChange={handleInputs} />
                    <div className="eyeBox" onClick={myRegComfirmPassword}>
                        {comfirmPasswordVisible ? (
                        <i id='eye-slash'>
                            <FaRegEyeSlash />
                        </i>
                        ) : (
                        <i id='eye'>
                            <FaRegEye />
                        </i>
                        )}
                    </div>
                </div>

                <div className="inputGroup">
                    {
                        isloading ? (
                            <Button />
                        ) : (
                            <button>Register</button>
                        )
                    }
                </div>
            </div>
            <small>Already have and account? <Link to='/login' className='link'>Login</Link> </small>

            <p className='errorText'>
                {error ? error : ''}
            </p>
        </div>
    </form>
  )
}

export default Registration