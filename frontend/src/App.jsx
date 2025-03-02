import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
