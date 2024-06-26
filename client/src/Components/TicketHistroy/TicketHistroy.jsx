import { useFetchBetSlips } from '../../hooks/fetch.hooks'
import './TicketHistroy.css'
import { formatDistanceToNow } from 'date-fns'

function TicketHistroy() {
  const { slipsData, slipsLoading } = useFetchBetSlips()
  const data = slipsData?.data
  console.log('dta', data)
  const sortedData = data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
  return (
    <div className='ticketHistroy'>
        <div className="histroyCard">
          {
            sortedData?.map((item) => (
              <div key={item?._id} className="histroy">
                <p>{item?.bettingCompaning}</p>
                <p>{item?.slipId}</p>
                <p>{formatDistanceToNow(new Date(item?.createdAt))} ago</p>
                <p>{item?.verified ? <span className='success'>Verified</span> : item?.rejected ? <span className='danger'>Rejected</span> : <span className='danger'>Pending</span>}</p>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default TicketHistroy