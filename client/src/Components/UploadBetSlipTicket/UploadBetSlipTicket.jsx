import { bettingPlatform } from '../../data/bettingPlatforms'
import './UploadBetSlipTicket.css'

function UploadBetSlipTicket() {
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            
        } catch (error) {
            
        }
    }
  return (
    <form onClick={handleSubmit} className='uploadBetSlipTicket'>
        <div className="inputGroup">
            <label htmlFor="">Enter Bet Slip ticket id</label>
            <input type="text" placeholder='ticket id' />
        </div>
        <div className="inputGroup">
            <label htmlFor="">Select Betting Platform</label>
            <select>
                <option value="">--Choose a platform--</option>
                {
                    bettingPlatform.map((item, idx) => (
                        <option key={idx} value={item?.platfrom}>{item?.platfrom}</option>
                    ))
                }
            </select>
        </div>

        <button>Submit</button>
    </form>
  )
}

export default UploadBetSlipTicket