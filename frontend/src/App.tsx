import React, {  Suspense, lazy } from 'react'
import {  Routes, Route } from 'react-router-dom'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import PayInvoice from './pages/PayInvoice.tsx'
import Dashboard from './pages/Dashboard.tsx'
import ProtectedRoutes from './components/ProtectedRoute.tsx'
import AddNewClient from './pages/AddNewClient.tsx'
import CheckYourEmail from './pages/CheckYourEmail.tsx'
import VerifyOtp from './pages/VerifyOtp.tsx'
import AddPaymentMethod from './pages/AddPaymentMethod.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import LandingPage from './pages/LandingPage.tsx'

const CreateInvoice = lazy(() => import('./pages/CreateInvoice.tsx') as Promise<{ default: React.ComponentType<any> }>);
function App() {
  return (
    <Routes>
        <Route path='/' element={<LandingPage />} />
        
        <Route path='/dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
        <Route path='/profile' element={<ProtectedRoutes><ProfilePage/></ProtectedRoutes>} />
        <Route
          path="/clients/new"
          element={
            <ProtectedRoutes>
              <AddNewClient />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/invoices/new'
          element={
            <ProtectedRoutes>
              <Suspense fallback={<div>Loading...</div>}>
                <CreateInvoice/>
              </Suspense>
            </ProtectedRoutes>
          }
        />
        <Route path='/add-payment-method' element={
          <ProtectedRoutes>
            <Suspense fallback={<div>loading....</div>}>
            <AddPaymentMethod/>
            </Suspense>
          </ProtectedRoutes>} 
        />
        
        <Route path='/check-your-email' element={<CheckYourEmail></CheckYourEmail>}/>
        <Route path='/verify-otp'element={<VerifyOtp/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/pay/:invoiceId' element={<PayInvoice/>} />
      </Routes>
  )
}

export default App
