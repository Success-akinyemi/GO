import { Link } from 'react-router-dom';
import './Footer.css'
import { PiWavesBold, PiPhone, PiHouse, PiEnvelope } from "react-icons/pi";


function Footer() {
  return (
    <div className='footer'>
        <div>
            <div className="mainLogo">
                Go <PiWavesBold className='icon' />

            </div>
        </div>

        <div>
          <div className="contact">
            <h2><PiPhone /> Phone:</h2>
            <a href='tel:2348066752092' className='link'>08066752092</a>
            <a href='tel:2347015377647' className='link'>07015377647</a>
          </div>

          <div className="address">
            <h2><PiHouse /> Address:</h2>
            <p>Markudi 2 New Bridge road Markudi</p>
          </div>
        </div>

        <div>
          <div className="quickLinks">
            <h2>Quick Links:</h2>
            <div className="links">
              <Link className='link' to='/registration'>Get Started</Link>
              <Link className='link' to='/login'>Login</Link>
              <Link className='link' to='/aboutUs'>About Us</Link>
            </div>
          </div>

          <div className="email">
            <h2><PiEnvelope /> Email:</h2>
            <a className='link' href="mailto:goxp.you@gmail.com">goxp.you@gmail.com</a>
          </div>
        </div>
    </div>
  )
}

export default Footer