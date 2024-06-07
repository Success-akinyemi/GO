import { Link, useLocation, useNavigate } from 'react-router-dom'
import { sidebarMenu } from '../../data/sidebarMenu'
import './Sidebar.css'
import { MdClose } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { apiUrl } from '../../utils/apiUrl';
import { signOut } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Sidebar({toggleMenu, handleTogleMenu}) {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()
    
    const { currentUser } = useSelector((state) => state.user);
    const user = currentUser?.data
  
    const isActive = (path) => {
      return location.pathname === path;
    };


    const handleSignOut = async () => {
        try {
            await fetch(apiUrl('/auth/signout'))
            dispatch(signOut())
            localStorage.removeItem('token')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className={`sidebar ${toggleMenu === true ? 'active' : ''}`}>
        <div className="closeBox" onClick={handleTogleMenu}>
            <MdClose />
        </div>
        <div className="sidebarContainer">
            <div className="top">
                <img src={user?.profileImage} alt={`Profile image of ${user?.fullName}`}/>
                <h3 className="name">{user?.fullName}</h3>
                <h4 className="username">{user?.userName}</h4>
            </div>

            <div className="menu">
                {
                    sidebarMenu.map((item, idx) => (
                        <Link className={`link sidebarLink ${isActive(`/${item.link}`) ? 'active' : ''}`} to={`/${item?.link}`} key={idx}>
                            {item?.name}
                        </Link>
                    ))
                }
            </div>

            <div className="logout">
                
            </div>

            <div className="logout" onClick={handleSignOut}>
                <TbLogout /> Logout
            </div>
        </div>

    </div>
  )
}

export default Sidebar