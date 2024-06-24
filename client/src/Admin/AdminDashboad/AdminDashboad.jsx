import Header from '../../Components/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../Components/AdminSidebar/AdminSidebar';

function AdminDashboad({handleTogleMenu, toggleMenu}) {
    const dispatch = useDispatch()
    
    const { currentUser } = useSelector((state) => state.goAdmin);
    const admin = currentUser?.data

  return (
    <div className='pageContainer'>
        <div className='pageLeft'>
            <AdminSidebar handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />
        </div>
        <div className='pageRight adminDashboad'>
            <Header title={'Dashboard'} handleTogleMenu={handleTogleMenu} />

        </div>
    </div>
  )
}

export default AdminDashboad