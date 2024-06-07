import './LandingPage.css'
import Navbar from '../../Components/Navabar/Navbar'
import Hero from '../../Components/Hero/Hero'
import HowWeWork from '../../Components/HowWeWork/HowWeWork'
import Footer from '../../Components/Footer/Footer'

function LandingPage() {
  return (
    <div className='landingPage'>
        <Navbar />
        <Hero />
        <HowWeWork />
        <Footer />
    </div>
  )
}

export default LandingPage