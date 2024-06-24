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
import { AuthorizeUser } from './Auth/ProtectRoute'
import ActivateBetCashback from './Components/Helpers/ActivateBetCashback/ActivateBetCashback'
import DeactivateBetCashBack from './Components/Helpers/DeactivateBetCashBack/DeactivateBetCashBack'
import Wallet from './Pages/Wallet/Wallet'
import AdminLogin from './Admin/AdminLogin/AdminLogin'
import AdminDashboad from './Admin/AdminDashboad/AdminDashboad'
import VerifyBetSlip from './Admin/VerifyBetSlip/VerifyBetSlip'


function App() {
  const [ toggleMenu, setToggleMenu ] = useState(false)
  const [ selectedCard, setSelectedCard ] = useState(null)

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
            <Route path='/bet-cashback' element={<BetCashback handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>
          <Route element={<AuthorizeUser />}>
            <Route path='/wallet' element={<Wallet handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />} />
          </Route>

          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/adminDashboad' element={<AdminDashboad handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />} />
          <Route path='/verify-bet-slip' element={<VerifyBetSlip handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App