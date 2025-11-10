import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedReactProps {
    children: ReactNode
}

const ProtectedRoutes = ({children}:ProtectedReactProps)=>{
    const token = localStorage.getItem("access_token");

    if(!token){
        return <Navigate to='/login' replace></Navigate>
    }

    return <>{children}</>
}

export default ProtectedRoutes;