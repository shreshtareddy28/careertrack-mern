import { useEffect, useState } from "react"
import axios from "axios"
import AddApplication from "../components/AddApplication"

function Dashboard(){

  const [apps,setApps] = useState([])

  useEffect(()=>{
    fetchApplications()
  },[])

  const fetchApplications = async ()=>{
    try{

      const token = localStorage.getItem("token")

      const res = await axios.get(
        "http://localhost:3001/api/applications",
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      setApps(res.data)

    }catch(error){
      console.log(error.response.data)
      alert("Error fetching applications")
    }
  }
  const refresh = ()=>{
  fetchApplications()
}

const handleDelete = async (id)=>{
  try{
    const token = localStorage.getItem("token")

    await axios.delete(
      `http://localhost:3001/api/applications/${id}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )

    alert("Deleted successfully")

    fetchApplications()

  }catch(error){
    console.log(error.response.data)
    alert("Error deleting")
  }
}

  return(
    <div>
      <h2>My Applications</h2>
      <AddApplication refresh={refresh} />

      {apps.length === 0 ? (
        <p>No applications found</p>
      ) : (
        apps.map((app)=>(
          <div key={app._id}>
            <h3>{app.company}</h3>
            <p>{app.role}</p>
            <p>Status: {app.status}</p>
            <button onClick={()=>handleDelete(app._id)}>
      Delete
    </button>
          </div>
        ))
      )}

    </div>
  )
}

export default Dashboard