import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard(){

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login")
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  if (loading) {
    return <h2 style={{textAlign:"center", marginTop:"50px"}}>Loading...</h2>
  }

  return(
    <div style={{background:"#f1f3f4", minHeight:"100vh"}}>

      {/* NAVBAR */}
      <div style={navbar}>
        <h2>CareerTrack</h2>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </div>

      {/* CONTENT */}
      <div style={container}>
        <h1 style={title}>Dashboard</h1>

        <div style={card}>
          <h3>Welcome 🎉</h3>
          <p>Your app is working perfectly!</p>
        </div>

      </div>
    </div>
  )
}

const navbar = {
  background:"#1a73e8",
  color:"white",
  padding:"15px 30px",
  display:"flex",
  justifyContent:"space-between"
}

const logoutBtn = {
  background:"white",
  color:"#1a73e8",
  border:"none",
  padding:"8px 12px",
  borderRadius:"6px",
  cursor:"pointer"
}

const container = {
  maxWidth:"800px",
  margin:"auto",
  padding:"30px"
}

const title = {
  textAlign:"center",
  color:"#1a73e8"
}

const card = {
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  marginTop:"20px",
  boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
}

export default Dashboard