import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Navigate } from 'react-router-dom'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import PayInvoice from './pages/PayInvoice.tsx'
import Dashboard from './pages/Dashboard.tsx'
import ProtectedRoutes from './components/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/dashboard' element={<ProtectedRoutes>{<Dashboard/>}</ProtectedRoutes>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/' element={<App/>}></Route>
            <Route path='/pay/:invoiceId' element={<PayInvoice/>}></Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
