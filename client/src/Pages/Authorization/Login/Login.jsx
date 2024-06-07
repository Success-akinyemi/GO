import { useEffect, useState } from 'react';
import './Login.css'
import { PiWavesBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import Button from '../../../Components/Helpers/Button/Button';
import { loginUsers } from '../../../apis/apis';
import { signInSuccess } from '../../../redux/user/userSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ error, setError ] = useState('')    
    const [ isloading, setIsloading ] = useState(false)
    const [ formData, setFormData ] = useState({})

    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleInputs = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    
    const handleLogin = async (e) => {
        e.preventDefault()
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

        try {
            setIsloading(true)
            const res = await loginUsers(formData)
            //console.log('res', res)
            if(res.isVerified === false){
                navigate('/emailVerification', {
                    state: { resMsg: res?.data },
                  });
            } else if(res.isVerified === true){
                dispatch(signInSuccess(res?.data))
                localStorage.setItem('token', res?.token)
                navigate('/dashboard')
            }
        } catch (error) {
            
        } finally {
            setIsloading(false)
        }
    }

    const myRegPassword = () => {
        setPasswordVisible((prev) => !prev)
      }

  return (
    <form onSubmit={handleLogin} className='login'>
        <div className="card">
            <div className="mainLogo">
                Go <PiWavesBold className='icon' />
            </div>

            <div className="line"></div>

            <div className="cardContent">
                <div className="inputGroup">
                    <label>Email</label>
                    <input onChange={handleInputs} type="email" id='email'/>
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

                <div className="inputGroup">
                    {
                        isloading ? (
                            <Button />
                        ) : (
                            <button disabled={isloading}>{isloading ? 'Checking...' : 'Login'}</button>
                        )
                    }
                </div>
            </div>
            <small>New here? <Link to='/registration' className='link'>Register</Link> </small>
            <small>Forgot password? <Link to='/forgotPassword' className='link'>click here</Link> </small>

            <p className='errorText'>
                {error ? error : ''}
            </p>
        </div>
    </form>
  )
}

export default Login