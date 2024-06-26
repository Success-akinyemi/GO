import { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Notifications.css'
import { useSelector } from 'react-redux';
import { updateNotifications } from '../../apis/apis';
import { useFetchUserAllTransactions } from '../../hooks/fetch.hooks';
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";
import { formatDistanceToNow } from 'date-fns'

function Notifications({handleTogleMenu, toggleMenu}) {
    const { currentUser } = useSelector((state) => state.user);
    const user = currentUser?.data
    const [formData, setFormData ] = useState({ userId: user._id })
    const { transactionData, transactionLoading } = useFetchUserAllTransactions()
    const data = transactionData?.data
    const sortedData = data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

    useEffect(() => {
        const handleUpdateNotifications = async () => {
            try {
                const res = await updateNotifications(formData)
            } catch (error) {

            }
        }
        handleUpdateNotifications()
    }, [])

    console.log(sortedData)

  return (
    <div className='pageContainer'>
        <div className='pageLeft'>
            <Sidebar handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />
        </div>
        <div className='pageRight notifications'>
            <Header title={'Notifications'} handleTogleMenu={handleTogleMenu} />
            <div className="cards">
                {
                    transactionLoading ? (
                        <p>Loading...</p>
                    ) : (
                        sortedData?.map((item) => (
                            <div className="card" key={item?._id}>
                                {
                                    item?.type === 'credit' ? (
                                        <div className='arrow credit'>
                                            <GoArrowDownLeft />
                                        </div>
                                    )
                                     : (
                                        <div className="arrow debit">
                                            <GoArrowUpRight />
                                        </div>
                                     )
                                }
                                <div>{item?.amount.toLocaleString()}</div>
                                <div>{item?.reason}</div>
                                <div>{formatDistanceToNow(new Date(item?.createdAt))}</div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Notifications