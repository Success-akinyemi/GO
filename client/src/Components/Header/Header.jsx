import { useSelector } from 'react-redux';
import './Header.css'
import { MdOutlineMenu } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useFetchUserAllTransactions } from '../../hooks/fetch.hooks';

function Header({title, handleTogleMenu}) {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.data
  const { transactionData, transactionLoading } = useFetchUserAllTransactions()
  const data = transactionData?.data
  const unverifiedCount = data?.filter(item => item.read === false)?.length;
  console.log('COUNT', unverifiedCount)
  return (
    <div className="header">
    <h2>{title}</h2>
    <div className="left">
        <div className='greating'>
            <span>Hello, <b>{user?.fullName}</b></span>
            <span className="time">Good Day</span>
        </div>

        <Link to='/notifications' className='link notifications'>
          {
            unverifiedCount > 0 && (
              <span>{unverifiedCount}</span>
            )
          }
          <FaBell className='bellIcon' />
        </Link>

        <div className="menuBox" onClick={handleTogleMenu}>
            <MdOutlineMenu />
        </div>
    </div>
</div>
  )
}

export default Header