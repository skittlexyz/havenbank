import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import PageWrapper from './Wrapper.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Accounts from './pages/Accounts.jsx'
import Transactions from './pages/Transactions.jsx'
import Cards from './pages/Cards.jsx'
import Logout from './pages/Logout.jsx'
import Settings from './pages/Settings.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageWrapper content={<App />} />} />

        <Route path='/login' element={<PageWrapper content={<Login />} />} />
        <Route path='/register' element={<PageWrapper content={<Register />} />} />
        <Route path='/forgot-password' element={<PageWrapper content={<ForgotPassword />} />} />
        <Route path='/logout' element={<PageWrapper content={<Logout />} />} />

        <Route path='/dashboard' element={<PageWrapper content={<Dashboard />} />} />

        <Route path='/profile' element={<PageWrapper content={<Profile />} />} />
        <Route path='/accounts' element={<PageWrapper content={<Accounts />} />} />
        <Route path='/transactions' element={<PageWrapper content={<Transactions />} />} />
        <Route path='/cards' element={<PageWrapper content={<Cards />} />} />
        
        <Route path='/settings' element={<PageWrapper content={<Settings />} />} />

        <Route path='*' element={<PageWrapper content={<NotFound />} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
