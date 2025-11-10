import React,{useState} from "react";
import api from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () =>{
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e:React.FormEvent) =>{
        e.preventDefault()
        setMessage("");

        try{
            const response = await api.post("/auth/login",{
                email: formData.email,
                password: formData.password
            });

            const token = response.data?.access_token;

            if(token){
                localStorage.setItem("access_token",token);
                setMessage("Login successfull!");
                navigate("/dashboard");
            }else{
                setMessage("Login failed")
            }
        }catch(error: any){
            setMessage(
                error.response?.data?.message || "Invalid email or Password"
            )
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md w-300"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Email</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Password</label>
                    <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    />
                </div>
                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                Login
                </button>

                {message && (
                <p className="text-center text-sm text-red-500 mt-4">{message}</p>
                )}
            </form>
        </div>
    )
}

export default  Login;