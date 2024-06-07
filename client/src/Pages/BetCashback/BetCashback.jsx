import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './BetCashback.css'

function BetCashback({handleTogleMenu, toggleMenu}) {
  return (
    <div className='pageContainer'>
    <div className='pageLeft'>
        <Sidebar handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />
    </div>
    <div className='pageRight betCashback'>
        <Header handleTogleMenu={handleTogleMenu} title={'Bet Cashback'} />
    </div>
</div>
  )
}

export default BetCashback