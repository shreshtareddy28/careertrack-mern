import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login(){

  const [form,setForm] = useState({
    email:"",
    password:""
  })

  const navigate = useNavigate()

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
      )

      localStorage.setItem("token",res.data.token)

      alert("Login Successful")

      navigate("/dashboard")

    }catch(error){
      console.log("FULL ERROR:", error)
      console.log("RESPONSE:", error.response)

      alert(error?.response?.data?.message || "Invalid credentials")
    }
  }

  return(
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"#f1f3f4"
    }}>

      <form onSubmit={handleSubmit} style={{
        width:"320px",
        background:"white",
        padding:"30px",
        borderRadius:"10px",
        boxShadow:"0 4px 12px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{
          textAlign:"center",
          color:"#1a73e8",
          marginBottom:"20px"
        }}>
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{
            width:"100%",
            padding:"10px",
            marginBottom:"12px",
            borderRadius:"6px",
            border:"1px solid #ccc"
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{
            width:"100%",
            padding:"10px",
            marginBottom:"15px",
            borderRadius:"6px",
            border:"1px solid #ccc"
          }}
        />

        <button type="submit" style={{
          width:"100%",
          padding:"10px",
          background:"#1a73e8",
          color:"white",
          border:"none",
          borderRadius:"6px",
          cursor:"pointer"
        }}>
          Login
        </button>

        <p style={{
          marginTop:"15px",
          textAlign:"center",
          fontSize:"14px"
        }}>
          Don’t have an account?{" "}
          <span 
            style={{color:"#1a73e8", cursor:"pointer"}}
            onClick={()=>navigate("/register")}
          >
            Register
          </span>
        </p>

      </form>
    </div>
  )
}

export default Login