import { useFetchAllBetSlips } from '../../../hooks/fetch.hooks'
import './BetSlipsContainer.css'
import { formatDistanceToNow } from 'date-fns'

function BetSlipsContainer({query, setBetSlipId, setBetUserId, setSelectedCard}) {
    const { slipsData, slipsLoading } = useFetchAllBetSlips()
    const data = slipsData?.data || [];
    const sortedData = data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Filter data based on the value of the query
    let filteredData;
    if (query === null) {
        filteredData = sortedData;
    } else if (query === 'pending') {
        filteredData = sortedData.filter(item => item.verified === false);
    } else if (query === 'verified') {
        filteredData = sortedData.filter(item => item.verified === true);
    }

    const handleVerify = (slip, user) => {
        setSelectedCard('verifyBetSlip')
        setBetSlipId(slip)
        setBetUserId(user)
    }
    const handleReject = (slip, user) => {
        setSelectedCard('rejectBetSlip')
        setBetSlipId(slip)
        setBetUserId(user)
    }
  return (
    <div className='BetSlipsContainer'>
        {slipsLoading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Slip ID</th>
                            <th>Betting Company</th>
                            <th>Date</th>
                            <th>Verified</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.map(slip => (
                            <tr className='tableRow' key={slip?._id}>
                                <td>{slip?.slipId}</td>
                                <td>{slip?.bettingCompaning}</td>
                                <td>{formatDistanceToNow(new Date(slip?.createdAt))} ago</td>
                                <td>{slip?.verified ? 
                                    <span className="success">Verified</span> 
                                    : (
                                        <div onClick={() => handleVerify(slip?.slipId, slip?.userId)} className='button'>Verify</div>
                                    )
                                    }
                                </td>
                                {
                                    <td>{slip?.verified ? 
                                        <span className="success">Verified</span> :
                                        slip?.rejected ? 
                                        <span onClick={() => handleVerify(slip?.slipId, slip?.userId)} className="danger">Rejected</span>
                                        : (
                                            <div onClick={() => handleReject(slip?.slipId, slip?.userId)} className='button reject'>Reject</div>
                                        )
                                        }
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>        
            )}
    </div>
  )
}

export default BetSlipsContainer