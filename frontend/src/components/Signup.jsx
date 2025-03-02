import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const Signup = () => {
    const [formdata, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/signup", formdata);
            console.log("Signup successful");
            navigate("/login");
        }catch(err){
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} required 
            className="w-full p-2 border border-gray-300 rounded-md" />
          <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} required 
            className="w-full p-2 border border-gray-300 rounded-md" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required 
            className="w-full p-2 border border-gray-300 rounded-md" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required 
            className="w-full p-2 border border-gray-300 rounded-md" />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
    )
}

export default Signup
