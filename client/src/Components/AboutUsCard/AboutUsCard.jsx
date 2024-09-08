import './AboutUsCard.css'

function AboutUsCard() {
  return (
    <div className="aboutUsCard">
        <div className="container">
            <h2 className="title">Who are we?</h2>
            <p className='para'>
            Introducing Goxpress a subssidary of Remedyexpress, a revolutionary digital cashback loyalty program that reward customers with cash returns on transactions and ourchases made through our website and card.
            with Goxpress, customers can earn cashbacks on tehir online betting, purchases nad lots more providing a seamless and rewarding shopping experince.
            </p>
            <span>
            * Earn rewards <br />
            * Cashbacks <br />
            * Redeemable Points <br />
            * Only on the Goxpress
            </span>

            <div className="howBetting">
            <h2>How Betting Cashbacks works</h2>
            <ol>
                <li>Place a bet on other betting platforms</li>
                <li>Purchase Go credit on our platform to upload teh code</li>
                <li>Upload the code on our platform</li>
                <li>Upon verification get 10%</li>
                <li>Withdrawal cash</li>
            </ol>
            </div>
        </div>
    </div>
  )
}

export default AboutUsCard