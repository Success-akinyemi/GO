import { useState } from 'react';
import './Login.css'
import { PiWavesBold } from "react-icons/pi";
import { Link } from 'react-router-dom';

function Login() {
    const [ error, setError ] = useState('Enter Password')

  return (
    <div className='login'>
        <div className="card">
            <div className="mainLogo">
                Go <PiWavesBold className='icon' />
            </div>

            <div className="line"></div>

            <div className="cardContent">
                <div className="inputGroup">
                    <label>Email</label>
                    <input type="email" />
                </div>

                <div className="inputGroup">
                    <label>Password</label>
                    <input type="password" />
                </div>

                <div className="inputGroup">
                    <button>Login</button>
                </div>
            </div>
            <small>New here? <Link to='/registration' className='link'>Register</Link> </small>

            <p className='errorText'>
                {error ? error : ''}
            </p>
        </div>
    </div>
  )
}

export default Login