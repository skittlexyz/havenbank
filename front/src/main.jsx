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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageWrapper content={<App />} />} />
        <Route path='/login' element={<PageWrapper content={<Login />} />} />
        <Route path='/register' element={<PageWrapper content={<Register />} />} />
        <Route path='/forgot-password' element={<PageWrapper content={<ForgotPassword />} />} />
        <Route path='*' element={<PageWrapper content={<NotFound />} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
