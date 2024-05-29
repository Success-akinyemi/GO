import { useState } from 'react'
import './Registration.css'
import { PiWavesBold } from "react-icons/pi";
import { Link } from 'react-router-dom';

function Registration() {
    const [ error, setError ] = useState('Enter Password')

  return (
    <div className='registration'>
        <div className="card">
            <div className="mainLogo">
                Go <PiWavesBold className='icon' />
            </div>

            <div className="line"></div>

            <div className="cardContent">
                <div className="inputGroup">
                    <label>Full Name</label>
                    <input type="text" />
                </div>

                <div className="inputGroup">
                    <label>Phone Number</label>
                    <input type="text" />
                </div>

                <div className="inputGroup">
                    <label>Email</label>
                    <input type="email" />
                </div>

                <div className="inputGroup">
                    <label>Password</label>
                    <input type="password" />
                </div>

                <div className="inputGroup">
                    <button>Register</button>
                </div>
            </div>
            <small>Already have and account? <Link to='/login' className='link'>Login</Link> </small>

            <p className='errorText'>
                {error ? error : ''}
            </p>
        </div>
    </div>
  )
}

export default Registration