import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import TicketHistroy from '../../Components/TicketHistroy/TicketHistroy'
import UploadBetSlipTicket from '../../Components/UploadBetSlipTicket/UploadBetSlipTicket'
import './BetCashback.css'

function BetCashback({handleTogleMenu, toggleMenu}) {
  return (
    <div className='pageContainer'>
    <div className='pageLeft'>
        <Sidebar handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />
    </div>
    <div className='pageRight betCashback'>
        <Header handleTogleMenu={handleTogleMenu} title={'Bet Cashback'} />
        
        <div className="text">
          <h2>Cash back bounues</h2>
          <p>Get cash back on every ticket you play that cuts. </p>

        </div>

        <div className="uploadTicket">
          <UploadBetSlipTicket />
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