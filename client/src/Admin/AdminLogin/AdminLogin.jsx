import { useDispatch } from 'react-redux'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { adminlogin } from '../../apis/apis'
import { PiWavesBold } from 'react-icons/pi'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import Button from '../../Components/Helpers/Button/Button'
import { signInSuccess } from '../../redux/admin/adminSlice'

function AdminLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ error, setError ] = useState('')    
    const [ isloading, setIsloading ] = useState(false)
    const [ formData, setFormData ] = useState({})

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordTokenVisible, setPasswordTokenVisible] = useState(false)


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
        if(!formData.passwordToken){
            toast.error('Enter Password Token')
            setError('Enter Password Token')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }
        if(!formData.passwordCode){
            toast.error('Enter Password Code')
            setError('Enter Password Code')
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }

        try {
            setIsloading(true)
            const res = await adminlogin(formData)
            //console.log('res', res)
            if(res.success === true){
                console.log('ERE', res)
                dispatch(signInSuccess(res?.data))
                localStorage.setItem('gotoken', res?.token)
                navigate('/adminDashboad')
            }
        } catch (error) {
            
        } finally {
            setIsloading(false)
        }
    }

    const myRegPassword = () => {
        setPasswordVisible((prev) => !prev)
      }

      const myPasswordToken = () => {
        setPasswordTokenVisible((prev) => !prev)
      }

  return (
    <form onSubmit={handleLogin} className='adminLogin'>
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
                    <label>Password Token</label>
                    <input type={passwordTokenVisible ? 'text' : 'password'} id='passwordToken' onChange={handleInputs} />
                    <div className="eyeBox" onClick={myPasswordToken}>
                        {passwordTokenVisible ? (
                        <i id='eye-slash'>
                            <FaRegEyeSlash />
                        </i>
                        ) : (
                        <i id='eye'>
                            <FaRegEye  />
                        </i>
                        )}
                    </div>
                </div>

                <div className="inputGroup password">
                    <label>Password Code</label>
                    <input type={passwordVisible ? 'text' : 'password'} id='passwordCode' onChange={handleInputs} />
                    <div className="eyeBox" onClick={myRegPassword}>
                        {passwordVisible ? (
                        <i id='eye-slash'>
                            <FaRegEyeSlash />
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

            <p className='errorText'>
                {error ? error : ''}
            </p>
        </div>
    </form>
  )
}

export default AdminLogin