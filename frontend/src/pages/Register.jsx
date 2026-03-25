import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register(){

  const [form,setForm] = useState({
    name:"",
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
      await axios.post("http://localhost:3001/api/auth/register",form)
      alert("Registered Successfully")
      navigate("/login")
    }catch(error){
      console.log("FULL ERROR:", error)
      console.log("RESPONSE:", error.response)
      alert(error.response?.data?.message || "Error")
    }
  }

  return(
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input type="text" name="name" placeholder="Name"  onChange={handleChange} />

        <input type="email" name="email" placeholder="Email" onChange={handleChange} />

        <input type="password" name="password" placeholder="Password" onChange={handleChange}  />

        <button type="submit">Register</button>

      </form>
    </div>
  )
}

export default Register