import { PiEnvelope, PiWavesBold } from 'react-icons/pi';
import './ResetEmailSent.css'
import { useLocation } from 'react-router-dom';

function ResetEmailSent() {
    const location = useLocation();
    const msg = location.state ? location.state.resMsg : 'Please Check your Email to verify Email';
    
    const openEmailApp = () => {
        window.location.href = 'mailto:';
    };

  return (
    <div className='resetEmailSent'>
                <div className="card">
        <div className="mainLogo">
                Go <PiWavesBold className='icon' />
            </div>

            <div className="line"></div>

            <div className="content">
            <div className="top-header">
                        <h2 className='h-2'>Reset Email Sent</h2>
                        <small>A password reset email successfully sent to you</small>
                    </div>

                    <div className="body">
                      <b>Sent to:</b>  <p>{msg}</p>
                    </div>

                    <div className="action" onClick={openEmailApp}>
                        Click to go to Email <PiEnvelope className='icon' />
                    </div>

                    <small className='warn'>Check spam box for email also</small>
            </div>
        </div>
    </div>
  )
}

export default ResetEmailSent