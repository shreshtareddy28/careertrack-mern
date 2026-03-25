import {  Routes, Route, Navigate, Link } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function Home() {

  const btn = {
    margin:"10px",
    padding:"10px 20px",
    border:"none",
    borderRadius:"6px",
    background:"#1a73e8",
    color:"white",
    cursor:"pointer",
    fontSize:"16px"
  }

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      height:"100vh",
      background:"#f1f3f4",
      textAlign:"center"
    }}>
      <h1 style={{color:"#1a73e8", fontSize:"40px", marginBottom:"10px"}}>
        Welcome to CareerTrack 🚀
      </h1>

      <p style={{color:"gray", fontSize:"18px"}}>
        Track your job applications easily
      </p>

      <div style={{marginTop:"30px"}}>
        <Link to="/login">
          <button style={btn}>Login</button>
        </Link>

        <Link to="/register">
          <button style={{...btn, background:"#34A853"}}>
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}

function App(){

  const isLoggedIn = localStorage.getItem("token")

  return(
    
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} 
        />

        <Route 
          path="/register" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} 
        />

        {/* Protected */}
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          } 
        />

        {/* Catch all (fix blank page issue) */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    
  )
}

export default App