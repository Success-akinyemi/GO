import { useState } from 'react'
import Header from '../../Components/Header/Header'
import { useFetchAllBetSlips } from '../../hooks/fetch.hooks'
import AdminSidebar from '../Components/AdminSidebar/AdminSidebar'
import './VerifyBetSlip.css'
import BetSlipsContainer from '../Components/BetSlipsContainer/BetSlipsContainer'

function VerifyBetSlip({handleTogleMenu, toggleMenu, setBetSlipId, setBetUserId, setSelectedCard}) {
    const { slipsData, slipsLoading } = useFetchAllBetSlips()
    const data = slipsData?.data
    const unverifiedCount = data?.filter(item => item.verified === false)?.length;
    //console.log('DATA', slipsData?.data, unverifiedCount)

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
                <div onClick={() => handleVerifyShift(null)} className={`option ${ isVerified === null ? 'active' : '' }`}>All</div>
                <div onClick={() => handleVerifyShift('pending')} className={`option one ${ isVerified === 'pending' ? 'active' : '' }`}>
                    Pending
                    {
                        unverifiedCount > 0  && (
                            <span>{unverifiedCount}</span> 
                        )
                    }
                </div>
                <div onClick={() => handleVerifyShift('verified')} className={`option ${ isVerified === 'verified' ? 'active' : '' }`}>Verified</div>
            </div>
            
            <div className="slipsBody">
                <h1 className='headText'>All Slips</h1>
                {
                    isVerified === null && (
                        <BetSlipsContainer setSelectedCard={setSelectedCard} setBetUserId={setBetUserId} setBetSlipId={setBetSlipId} query={null} />
                    )
                }

                {
                    isVerified === 'pending' && (
                        <BetSlipsContainer setSelectedCard={setSelectedCard} setBetUserId={setBetUserId} setBetSlipId={setBetSlipId} query={'pending'} />
                    )
                }

                {
                    isVerified === 'verified' && (
                        <BetSlipsContainer setSelectedCard={setSelectedCard} setBetUserId={setBetUserId} setBetSlipId={setBetSlipId} query={'verified'} />
                    )
                }
            </div>

        </div>
    </div>
  )
}

export default VerifyBetSlip