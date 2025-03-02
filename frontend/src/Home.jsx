import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Auth System</h1>
      <div className="space-x-4">
        <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Sign Up
        </Link>
        <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;

