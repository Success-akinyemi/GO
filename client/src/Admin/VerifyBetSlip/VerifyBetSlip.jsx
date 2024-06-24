import { useState } from 'react'
import Header from '../../Components/Header/Header'
import { useFetchAllBetSlips } from '../../hooks/fetch.hooks'
import AdminSidebar from '../Components/AdminSidebar/AdminSidebar'
import './VerifyBetSlip.css'

function VerifyBetSlip({handleTogleMenu, toggleMenu}) {
    const { slipsData, slipsLoading } = useFetchAllBetSlips()
    const data = slipsData?.data
    const unverifiedCount = data?.filter(item => item.verified === false)?.length;
    console.log('DATA', slipsData?.data, unverifiedCount)

    const [ isVerified, setIsVerified ] = useState(null)

    const handleVerifyShift = (props) => {
        setIsVerified(props)
    } 

  return (
    <div className='pageContainer'>
        <div className='pageLeft'>
            <AdminSidebar handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />
        </div>
        <div className='pageRight verifyBetSlip'>
            <Header title={'Verify Bet Slip'} handleTogleMenu={handleTogleMenu} />

            <div className="options">
                <div onClick={() => handleVerifyShift(null)} className="option">All</div>
                <div onClick={() => handleVerifyShift('pending')} className="option one">
                    Pending
                    {
                        unverifiedCount > 0  && (
                            <span>{unverifiedCount}</span> 
                        )
                    }
                </div>
                <div onClick={() => handleVerifyShift('verified')} className="option">Verified</div>
            </div>

            {
                isVerified === null && (
                    ''
                )
            }

{
                isVerified === 'pending' && (
                    ''
                )
            }

{
                isVerified === 'verified' && (
                    ''
                )
            }

        </div>
    </div>
  )
}

export default VerifyBetSlip