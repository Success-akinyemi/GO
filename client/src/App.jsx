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


function App() {
  const [ toggleMenu, setToggleMenu ] = useState(false)

  const handleTogleMenu = () => {
    setToggleMenu((prev) => !prev)
  }
  return (
    <div className='app'>
      <Toaster></Toaster>
      <BrowserRouter>
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
            <Route path='/bet-cashback' element={<BetCashback handleTogleMenu={handleTogleMenu} toggleMenu={toggleMenu} />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App