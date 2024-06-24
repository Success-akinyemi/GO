import { Link, useLocation, useNavigate } from 'react-router-dom'
import './AdminSidebar.css'
import { MdClose } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { adminSidebarMenu } from '../../../data/adminSidebarMenu';
import { apiUrl } from '../../../utils/apiUrl';
import { signOut } from '../../../redux/admin/adminSlice';

function AdminSidebar({toggleMenu, handleTogleMenu}) {
    const dispatch = useDispatch()
    const { currentUser: adminCurrentUser } = useSelector((state) => state.goAdmin);
    const { currentUser: userCurrentUser } = useSelector((state) => state.user);
    
    const admin = adminCurrentUser?.data;
    const user = userCurrentUser?.data;


    const isActive = (path) => {
        return location.pathname === path;
      };
  
  
      const handleSignOut = async () => {
          try {
              await fetch(apiUrl('/admin/signout'))
              dispatch(signOut())
              localStorage.removeItem('token')
              navigate('/')
          } catch (error) {
              console.log(error)
          }
      }

  return (
    <div className={`adminSidebar ${toggleMenu === true ? 'active' : ''}`}>
        <div className="closeBox" onClick={handleTogleMenu}>
            <MdClose />
        </div>
        <div className="sidebarContainer">
            <div className="top">
                <img src={user?.profileImage} alt={`Profile image of ${user?.fullName}`}/>
                <h3 className="name">{user?.fullName}</h3>
                <h4 className="username">{admin?.role}</h4>
            </div>

            <div className="menu">
                {
                    adminSidebarMenu.map((item, idx) => (
                        <Link onClick={handleTogleMenu} className={`link sidebarLink ${isActive(`/${item.link}`) ? 'active' : ''}`} to={`/${item?.link}`} key={idx}>
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

export default AdminSidebar