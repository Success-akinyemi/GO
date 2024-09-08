import AboutUsCard from "../../Components/AboutUsCard/AboutUsCard"
import Navbar from "../../Components/Navabar/Navbar"


function AboutUs() {
  return (
    <div className="aboutUs">
        <Navbar />
        <div>
            <AboutUsCard />
        </div>
    </div>
  )
}

export default AboutUs