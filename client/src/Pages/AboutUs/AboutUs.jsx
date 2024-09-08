import AboutUsCard from "../../Components/AboutUsCard/AboutUsCard"
import Footer from "../../Components/Footer/Footer"
import Navbar from "../../Components/Navabar/Navbar"
import './AboutUs.css'

function AboutUs() {
  return (
    <div className="aboutUs">
        <Navbar />
        <div className="content">
            <AboutUsCard />
        </div>
        <Footer />
    </div>
  )
}

export default AboutUs