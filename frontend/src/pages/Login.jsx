import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e)=>{
    e.preventDefault()

    if(email && password){
      localStorage.setItem("token", "testtoken")
      navigate("/dashboard")
    } else {
      alert("Enter all fields")
    }
  }

  return(
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            style={input}
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button style={button}>Login</button>
        </form>

        <p style={text}>
          Don't have account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f1f3f4"
}

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "300px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
}

const title = {
  textAlign: "center",
  marginBottom: "20px"
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
}

const button = {
  width: "100%",
  padding: "10px",
  background: "#1a73e8",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
}

const text = {
  textAlign: "center",
  marginTop: "10px"
}

export default Login