import { useState } from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import TicketHistroy from '../../Components/TicketHistroy/TicketHistroy'
import UploadBetSlipTicket from '../../Components/UploadBetSlipTicket/UploadBetSlipTicket'
import { useFetchBetPoint } from '../../hooks/fetch.hooks'
import './BetCashback.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { betPointRewards } from '../../data/betPointsRewards'

function BetCashback({handleTogleMenu, toggleMenu, setSelectedCard}) {
  const { betPointsData, betPointsLoading } = useFetchBetPoint()
  const betData = betPointsData?.data
  
  var settings = {
    speed: 500,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {      
        breakpoint: 950,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: true,
        } 
      },
      {      
        breakpoint: 450,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: true,
        } 
      },
    ]
  }

  return (
    <div className='pageContainer'>
    <div className='pageLeft'>
        <Sidebar handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />
    </div>
    <div className='pageRight betCashback'>
        <Header handleTogleMenu={handleTogleMenu} title={'Bet Cashback'} />
        <div className="infoTop">
          <div className="left">
            {
              betData === null || betData?.active === false || betData === undefined ? (
                <div onClick={() => setSelectedCard('activateBetCashback')} className="btn">
                  <button className="button">Activate</button>
                </div>
              ) : (
                <div className="btn">
                  <button onClick={() => setSelectedCard('deactiveBetCashback')} className="button">Deactivate</button>
                </div>
              )
            }
          </div>

          <div className="right">
            {
              betData?.active && (
                <div>
                  <p>Point Balance: <span>{betData?.pointBalance}</span></p>
                  <p>Bet Cash Back Status: <span>{betData?.active ? 'Active' : 'Inactive'}</span></p>
                </div>
              )
            }
          </div>

        </div>
        <div className="text">
          <h2>Cash back bounues</h2>
          <p><b>Get paid on every ticket you play that cuts.</b> </p>

        </div>

        <div className="uploadTicket">
          <UploadBetSlipTicket />
        </div>

        <div className="rewards">
          <h3>Amazing rewards to be won with bet bet points </h3>
          <p>Get enough points and win amazing prices</p>
          
          <div className="body">
            <Slider {...settings}>
              {
                betPointRewards?.map((item, idx) => (
                  <div className="card">
                    <img src={item?.img} alt={item?.name} />
                    <div className="label">
                      <span>{item?.name}</span>
                      <span>{item?.points}</span>
                    </div>
                  </div>
                ))
              }
            </Slider>
          </div>

          <div className="btn">
            <button className="button">Redeem Points</button>
          </div>          
        </div>

        <div className="histroy">
          <h2>Ticket(s) Histroy</h2>
          <TicketHistroy />
        </div>
    </div>
</div>
  )
}

export default BetCashback