import { Link } from 'react-router-dom';
import './Navbar.css'
import { PiWavesBold } from "react-icons/pi";

function Navbar() {
  return (
    <div className='navbar'>
        <div className="mainLogo">
            Go <PiWavesBold className='icon' />

        </div>

        <div className="menu">
            <Link className='link' to='/registration' >Get Started</Link>
            <Link className='link' to='/login' >Login</Link>
        </div>
    </div>
  )
}

export default Navbar