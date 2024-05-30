import './LandingPage.css'
import Navbar from '../../Components/Navabar/Navbar'
import Hero from '../../Components/Hero/Hero'
import HowWeWork from '../../Components/HowWeWork/HowWeWork'

function LandingPage() {
  return (
    <div className='landingPage'>
        <Navbar />
        <Hero />
        <HowWeWork />
    </div>
  )
}

export default LandingPage