import './Hero.css'
import HeroImg from '../../assets/three.png'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='hero'>
        <div className='left'>
            Earn <span>money</span>, <span>royalties</span>, <span>points</span> <span>rewards</span>, and <span>discount</span> from your favorite brands every month for using the <div className='mainLogo'>GoCard</div> and in App purchases make every transactions count!.
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