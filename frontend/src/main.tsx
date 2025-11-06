import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
