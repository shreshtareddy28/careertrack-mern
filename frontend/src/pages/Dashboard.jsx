import { useEffect, useState } from "react"
import axios from "axios"
import AddApplication from "../components/AddApplication"

function Dashboard(){

  const [apps,setApps] = useState([])
  const [stats, setStats] = useState({})

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
  fetchStats()
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

   refresh()

  }catch(error){
    console.log(error.response.data)
    alert("Error deleting")
  }
}
const handleUpdate = async(id, status)=>{
  try{
    const token = localStorage.getItem("token")

    await axios.put(
      `http://localhost:3001/api/applications/${id}`,
      { status },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )

    refresh() 

  }catch(error){
    console.log(error)
  }
}
const cardStyle = {
  padding:"15px",
  background:"#4CAF50",
  color:"white",
  borderRadius:"10px",
  width:"120px",
  textAlign:"center",
  fontWeight:"bold"
}

const appCard = {
  border:"1px solid #ccc",
  padding:"15px",
  margin:"10px 0",
  borderRadius:"10px",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
}

  return(
  <div style={{padding:"20px"}}>

    <h1 style={{textAlign:"center"}}>CareerTrack Dashboard </h1>

    {/* Stats Section */}
    <div style={{
      display:"flex",
      justifyContent:"space-around",
      marginTop:"20px"
    }}>
      <div style={cardStyle}>Applied: {stats.Applied || 0}</div>
      <div style={cardStyle}>Interview: {stats.Interview || 0}</div>
      <div style={cardStyle}>Rejected: {stats.Rejected || 0}</div>
      <div style={cardStyle}>Offer: {stats.Offer || 0}</div>
    </div>

    {/* Add Application */}
    <div style={{marginTop:"30px"}}>
      <AddApplication refresh={refresh}/>
    </div>

    {/* Applications List */}
    <div style={{marginTop:"30px"}}>

      {apps.length === 0 ? (
        <p>No applications found</p>
      ) : (
        apps.map((app)=>(
          <div key={app._id} style={appCard}>

            <h3>{app.company}</h3>
            <p>{app.role}</p>

            <select
              value={app.status}
              onChange={(e)=>handleUpdate(app._id, e.target.value)}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Offer</option>
            </select>

            <button onClick={()=>handleDelete(app._id)}>
              Delete
            </button>

          </div>
        ))
      )}

    </div>

  </div>
)
}
export default Dashboard