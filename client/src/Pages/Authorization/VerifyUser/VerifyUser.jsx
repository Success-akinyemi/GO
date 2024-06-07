import { useEffect, useState } from 'react';
import './VerifyUser.css'
import { useNavigate, useParams } from 'react-router-dom';
import { verifyUser } from '../../../apis/apis';
import { PiWavesBold } from 'react-icons/pi';

function VerifyUser() {
    const navigate = useNavigate()
    const { id, token } = useParams();
    const [ errorMsg, setErrorMsg ] = useState(null)

    useEffect(() => {
        const verify = async () => {
            try {
                setErrorMsg(null)
                const res = await verifyUser({ id, token})

                if(res.data.success){
                    navigate('/login')
                } 
            } catch (error) {
                setErrorMsg('Unable To verify Account')
                
            }    
        }

        verify();
    }, [id, token])

    const relaod = () => {
        window.location.reload()
    }

  return (
    <div className='verifyUser'>
            <div className="card">
            <div className="mainLogo">
                Go <PiWavesBold className='icon' />
            </div>
            
            <h1 className="title">Verifing User</h1>

            <div className="line"></div>

            <div className="cardContent">
                    {
                        errorMsg ? (
                            <div className="errorText">
                                <p>{errorMsg}</p>
                                <div className="btn">
                                    <button onClick={relaod}>Retry</button>
                                </div>
                            </div>
                        ) : (
                            <div className="spinner"></div>
                        )
                    }
            </div>
        </div>
    </div>
  )
}

export default VerifyUser