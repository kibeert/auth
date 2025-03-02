import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
            } catch (err) {
                console.error("Error fetching user details:", err);
                navigate("/login");
            }
        };

        fetchUserDetails();
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
                <div className="space-y-4">
                    <p><strong>First Name:</strong> {user.firstname}</p>
                    <p><strong>Last Name:</strong> {user.lastname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
