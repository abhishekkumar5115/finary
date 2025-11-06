import React,{useState} from "react";
import api from "../api/axios";

const Register = ()=>{
    const [formData,setFormData] = useState({
        full_name: "",
        email: "",
        password: ""
    });

    const [message,setMessage] = useState("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData ({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setMessage("");
        // TODO: use `api` to submit formData
        try{
            const response = await api.post("/users",{
                full_name : formData.full_name,
                email :  formData.email,
                password : formData.password
            });
            setMessage("Registration Successfull!");
        }
        catch(error:any){
            setMessage(
                error.response?.data?.message || "Something went wrong during registration"
            )
        }
    };

    return (
       <div className="flex justify-centre items-center h-screen bg-gray-100">
        <form 
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md w-300"
        >
            <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
            <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Full_Name</label>
                    <input
                     type="text"
                     name="full_name"
                     value={formData.full_name}
                     onChange={handleChange}
                     className="w-full p-2 border text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                     required
                    />
            </div>
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
                Register
            </button>

            {message && (
                <p className="text-center text-sm text-red-500 mt-4">{message}</p>
            )}
        </form>
       </div>
    );
};

export default Register;