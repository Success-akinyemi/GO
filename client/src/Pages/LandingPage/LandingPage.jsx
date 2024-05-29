import './LandingPage.css'
import Navbar from '../../Components/Navabar/Navbar'
import Hero from '../../Components/Hero/Hero'

function LandingPage() {
  return (
    <div className='landingPage'>
        <Navbar />
        <Hero />
    </div>
  )
}

export default LandingPage