import Header from '../../Components/Header/Header'
import Loading from '../../Components/Helpers/Loading/Loading';
import { useFetchAllUsers } from '../../hooks/fetch.hooks'
import AdminSidebar from '../Components/AdminSidebar/AdminSidebar'
import './AllUsers.css'
import { IoMdMore } from "react-icons/io";

function AllUsers({handleTogleMenu, toggleMenu, setSelectedCard, setUserId, setUsername}) {
    const { allUsersData, allUsersLoading } = useFetchAllUsers()
    //console.log('allUsersData',allUsersData)
    const userData = allUsersData?.data
    const sortedData = userData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const handleCredit = (id, email) => {
        setUserId(id)
        setUsername(email)
        setSelectedCard('creditUser')
    }

    return (
    <div className='pageContainer'>
        <div className='pageLeft'>
            <AdminSidebar handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />
        </div>
        <div className='pageRight allUsers'>
            <Header title={'All Users'} handleTogleMenu={handleTogleMenu} />
            <div className="users">
                <div className="top">
                    <h2 className='headText'>All Users</h2>
                </div>

                <div className="search">
                    <input className='input' type="text" placeholder='Serach users' />
                </div>

                <div className="userCard">
                    {
                        allUsersLoading ? (
                            <div className="loadingState">
                                <Loading />
                            </div>
                        ) : (
                            sortedData?.map((item) => (
                                <div key={item?._id} className="user">
                                    <div>{item?.email}</div>
                                    <div>{item?.fullName}</div>
                                    <div>{item?.walletBalance}</div>
                                    <div className="actions">
                                        <div className="btns">
                                            <div onClick={() => handleCredit(item?._id, item?.email)} className="btn">
                                                <div className="button">Credit User</div>
                                            </div>
                                            <div onClick={''} className="btn">
                                                <div className="button danger">Block User</div>
                                            </div>
                                        </div>
                                        <div className="more">
                                            <IoMdMore className='moreIcon' />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllUsers