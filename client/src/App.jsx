import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import Login from './Pages/Authorization/Login/Login'
import Registration from './Pages/Authorization/Registration/Registration'
import { Toaster } from 'react-hot-toast'
import EmailVerification from './Pages/Authorization/EmailVerification/EmailVerification'
import ResetEmailSent from './Pages/Authorization/ResetEmailSent/ResetEmailSent'
import ForgotPassword from './Pages/Authorization/ForgotPassword/ForgotPassword'
import VerifyUser from './Pages/Authorization/VerifyUser/VerifyUser'
import Dashboard from './Pages/Dashboard/Dashboard'
import BetCashback from './Pages/BetCashback/BetCashback'
import { useState } from 'react'
import { AuthorizeAdmin, AuthorizeUser } from './Auth/ProtectRoute'
import ActivateBetCashback from './Components/Helpers/ActivateBetCashback/ActivateBetCashback'
import DeactivateBetCashBack from './Components/Helpers/DeactivateBetCashBack/DeactivateBetCashBack'
import Wallet from './Pages/Wallet/Wallet'
import AdminLogin from './Admin/AdminLogin/AdminLogin'
import AdminDashboad from './Admin/AdminDashboad/AdminDashboad'
import VerifyBetSlip from './Admin/VerifyBetSlip/VerifyBetSlip'
import VerifySlip from './Admin/Components/VerifySlip/VerifySlip'
import AllUsers from './Admin/AllUsers/AllUsers'
import CreditUser from './Admin/Components/CreditUser/CreditUser'
import RejectBetSlip from './Admin/Components/RejectBetSlip/RejectBetSlip'
import Notifications from './Pages/Notifications/Notifications'
import AddFunds from './Components/AddFunds/AddFunds'
import BuyCredit from './Components/BuyCredit/BuyCredit'


function App() {
  const [ toggleMenu, setToggleMenu ] = useState(false)
  const [ selectedCard, setSelectedCard ] = useState(null)
  const [ betUserId, setBetUserId ] = useState()
  const [ betSlipId, setBetSlipId ] = useState()
  const [ userId, setUserId ] = useState()
  const [ username, setUsername ] = useState()


  const renderPopupComponent = () => {
    switch(selectedCard) {
      case 'activateBetCashback' :
        return (
            <div className='popup-card'>
              <ActivateBetCashback />
            </div>
        );
      case 'deactiveBetCashback' :
        return (
            <div className='popup-card'>
              <DeactivateBetCashBack />
            </div>
        );
      case 'verifyBetSlip' :
        return (
          <div className='popup-card'>
              <VerifySlip betUserId={betUserId} betSlipId={betSlipId} />
            </div>
        );
      case 'rejectBetSlip' :
        return (
          <div className='popup-card'>
            <RejectBetSlip betUserId={betUserId} betSlipId={betSlipId} />
          </div>
        );
      case 'creditUser' :
        return (
          <div className='popup-card'>
              <CreditUser username={username} userId={userId} />
            </div>
        );
      case 'addFunds' :
        return (
          <div className='popup-card'>
              <AddFunds username={username} userId={userId} />
            </div>
        );
      case 'buyCredit':
        return (
          <div className='popup-card'>
              <BuyCredit />
            </div>
        );
    }
  }

  const closePopup = () => {
    setSelectedCard(null);
  };

  const handleTogleMenu = () => {
    setToggleMenu((prev) => !prev)
  }
  return (
    <div className='app'>
      <Toaster></Toaster>
      <BrowserRouter>
      {selectedCard && (
        <>
          <div className='popup-overlay'></div>
          <div className={`popup active`}>
              <span className='popup-close' onClick={closePopup}>
                Close
              </span>
            <div className='popup-content'>
                {renderPopupComponent()}
            </div>
          </div>
        </>
      )}
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/:id/verify/:token' element={<VerifyUser />} />
          <Route path='/emailVerification' element={<EmailVerification />} />
          <Route path='/resetEmailSent' element={<ResetEmailSent />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />

          <Route element={<AuthorizeUser />}>
            <Route path='/dashboard' element={<Dashboard handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />} />
          </Route>
          <Route element={<AuthorizeUser />}>
            <Route path='/notifications' element={<Notifications handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />} />
          </Route>
          <Route element={<AuthorizeUser />}>
            <Route path='/bet-cashback' element={<BetCashback handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>
          <Route element={<AuthorizeUser />}>
            <Route path='/wallet' element={<Wallet handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>

          <Route path='/admin-login' element={<AdminLogin />} />
          <Route element={<AuthorizeAdmin />}>
            <Route path='/admin-dashboard' element={<AdminDashboad handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />} />
          </Route>
          <Route element={<AuthorizeAdmin />}>
            <Route path='/all-users' element={<AllUsers handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} setUsername={setUsername} setUserId={setUserId} setSelectedCard={setSelectedCard} />} />
          </Route>
          <Route element={<AuthorizeAdmin />}>
            <Route path='/verify-bet-slip' element={<VerifyBetSlip handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} setBetSlipId={setBetSlipId} setBetUserId={setBetUserId} setSelectedCard={setSelectedCard} />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App