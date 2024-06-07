import { PiEnvelope, PiWavesBold } from 'react-icons/pi'
import './EmailVerification.css'
import { useLocation } from 'react-router-dom';

function EmailVerification() {
    const location = useLocation();
    const msg = location.state ? location.state.resMsg : 'Please Check your Email to verify Email';
    
    const openEmailApp = () => {
        window.location.href = 'mailto:';
    };

  return (
    <div className='emailVerification'>
        <div className="card">
        <div className="mainLogo">
                Go <PiWavesBold className='icon' />
            </div>

            <div className="line"></div>

            <div className="content">
                <div>
                    <h2 className='h-2'>Account Creeated Successfully</h2>
                    <small>Your account has been successfully created</small>
                </div>

                <div className="body">
                    <p>{msg}</p>
                </div>

                <div className="action" onClick={openEmailApp}>
                    Click to go to Email <PiEnvelope className='icon' />
                </div>

                <small className='warn'>Check spam box for email sent also</small>
            </div>
        </div>
    </div>
  )
}

export default EmailVerification