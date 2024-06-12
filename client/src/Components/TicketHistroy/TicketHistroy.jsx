import { useFetchBetSlips } from '../../hooks/fetch.hooks'
import './TicketHistroy.css'

function TicketHistroy() {
  const { slipsData, slipsLoading } = useFetchBetSlips()
  const data = slipsData?.data
  console.log('dta', data)
  return (
    <div className='ticketHistroy'>
        TicketHistroy
    </div>
  )
}

export default TicketHistroy