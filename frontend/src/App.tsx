import React, {  Suspense, lazy } from 'react'
import {  Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import PayInvoice from './pages/PayInvoice.tsx'
import Dashboard from './pages/Dashboard.tsx'
import ProtectedRoutes from './components/ProtectedRoute.tsx'
import AddNewClient from './pages/AddNewClient.tsx'

const CreateInvoice = lazy(() => import('./pages/CreateInvoice.tsx') as Promise<{ default: React.ComponentType<any> }>);
function App() {
  return (
    <Routes>
        <Route path='/dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/pay/:invoiceId' element={<PayInvoice/>} />
      </Routes>
  )
}

export default App
