import './HowWeWork.css'
import CashbackImg from '../../assets/cashback.jpg'
import DiscountImg from '../../assets/discount.jpg'
import PurchaseHistroyImg from '../../assets/purchaseHistroy.png'
import IntergrationImg from '../../assets/intergration.jpg'
import { Link } from 'react-router-dom'

function HowWeWork() {
  return (
    <div className='howWeWork'>
        <div className="top">
            {/**Use our platform to earn cash back in-store */}
            Unlock rewards and benefits.
        </div>

        <div className="body">
            <div className="card">
                <img src={CashbackImg} alt='' />
                <span>
                    Feature cards highlighting - cashback and points on daily purchase
                </span>
            </div>
            <div className="card">
                <img src={DiscountImg} alt='' />
                <span>
                    Exclusive discounts and offers
                </span>
            </div>
            <div className="card">
                <img src={PurchaseHistroyImg} alt='' />
                <span>
                    Personalized rewards based on purchase history and prefrences
                </span>
            </div>
            <div className="card">
                <img src={IntergrationImg} alt='' />
                <span>
                    Intergration with compaines. Shop from a wide range of your favourites brands
                </span>
            </div>
        </div>

        <div className="cta">
            <Link className="link">Get Started</Link>
        </div>
    </div>
  )
}

export default HowWeWork