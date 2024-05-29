import './Hero.css'
import HeroImg from '../../assets/three.png'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='hero'>
        <div className='left'>
            Earn <span>Cash backs</span>, <span>Royalties</span>, <span>Copuon</span> from every transaction with <div className='mainLogo'>Go</div>
        <br />
        <div className='text'>Cash back every time you shop</div>
        <Link to='/registration' className="link getStarted">
            Get started
        </Link>
        </div>
        <div className='right'>
            <img src={HeroImg} alt='person with phone making transaction' />
        </div>
    </div>
  )
}

export default Hero