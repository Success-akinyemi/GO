import { useSelector } from 'react-redux';
import './Header.css'
import { MdOutlineMenu } from "react-icons/md";

function Header({title, handleTogleMenu}) {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.data

  return (
    <div className="header">
    <h2>{title}</h2>
    <div className="left">
        <div className='greating'>
            <span>Hello, <b>{user?.fullName}</b></span>
            <span className="time">Good Day</span>
        </div>
        <div className="menuBox" onClick={handleTogleMenu}>
            <MdOutlineMenu />
        </div>
    </div>
</div>
  )
}

export default Header