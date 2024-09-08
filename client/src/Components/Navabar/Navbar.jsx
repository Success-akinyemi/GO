import { Link } from 'react-router-dom';
import './Navbar.css'
import { PiWavesBold } from "react-icons/pi";

function Navbar() {
  return (
    <div className='navbar'>
        <Link to='/' className="link mainLogo">
            Go <PiWavesBold className='icon' />

        </Link>

        <div className="menu">
            <Link className='link' to='/registration' >Get Started</Link>
            <Link className='link' to='/login' >Login</Link>
        </div>
    </div>
  )
}

export default Navbar