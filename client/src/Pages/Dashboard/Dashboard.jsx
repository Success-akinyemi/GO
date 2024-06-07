import Sidebar from '../../Components/Sidebar/Sidebar'
import './Dashboard.css'
import MasteCardLogo from '../../assets/card/logo.png'
import ChipImg from '../../assets/card/chip.png'
import BgImg from '../../assets/card/bg.png'
import { PiWavesBold } from 'react-icons/pi'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react'
import Header from '../../Components/Header/Header'
import { useSelector } from 'react-redux'

function Dashboard({handleTogleMenu, toggleMenu}) {
    const { currentUser } = useSelector((state) => state.user);
    const user = currentUser?.data
    const createdAt = user?.createdAt;
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit"
    });

    const [ showBalance, setShowBalance ] = useState(false)

    const toggleBalance = () => {
        setShowBalance((prev) => !prev)
    }
  return (
    <div className='pageContainer'>
        <div className='pageLeft'>
            <Sidebar handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />
        </div>
        <div className='pageRight dashboard'>
            <Header title={'Dashboard'} handleTogleMenu={handleTogleMenu} />
            <div className="top">
                <div className="atmCard">
                    <div className="head">
                        <span className="logo">
                            <div className="mainLogo">
                                Go <PiWavesBold className='icon' />
                            </div>
                            <h5>GoCard</h5>
                        </span>
                        <img src={ChipImg} alt="chip" className='chip' />
                    </div>

                    <div className="availableBalance">
                        <h1>
                            {
                                showBalance ? (
                                  <> NGN 1000</>
                                ) : (
                                    <>--.--</>
                                )
                            }
                        </h1>
                        <div onClick={toggleBalance} className="visiblity">
                            {
                                showBalance ? (
                                    <FaRegEyeSlash />
                                ) : (
                                    <FaRegEye />
                                )
                            }
                        </div>
                    </div>

                    <div className="cardDetails">
                        <div className="nameNumber">
                            <h6>Card Number</h6>
                            <h5 className="number">
                                8050 50 40 2030 3020
                            </h5>
                            <h5 className="name">Go Card User</h5>
                        </div>
                        <div className="validDate">
                            <h6>Created on</h6>
                            <h5>{formattedDate}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard