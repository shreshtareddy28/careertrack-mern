import { useEffect, useState } from "react"
import axios from "axios"
import AddApplication from "../components/AddApplication"
import { useNavigate } from "react-router-dom"



const navigate = useNavigate()

useEffect(() => {
  const token = localStorage.getItem("token")
  if (!token) {
    navigate("/Login")
  }
}, [])

function Dashboard(){

  const [apps, setApps] = useState([])
  const [stats, setStats] = useState({
    Applied: 0,
    Interview: 0,
    Rejected: 0,
    Offer: 0
  })

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("latest")
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
  const token = localStorage.getItem("token")
  if (!token) {
    navigate("/Login")
  }
}, [])

  const fetchStats = (appsData) => {
    let newStats = {
      Applied: 0,
      Interview: 0,
      Rejected: 0,
      Offer: 0
    }

    appsData.forEach(app => {
      if (newStats[app.status] !== undefined) {
        newStats[app.status]++
      }
    })

    setStats(newStats)
  }

  const fetchApplications = async ()=>{
    try{
      setLoading(true)

      const token = localStorage.getItem("token")

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/applications`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      setApps(res.data)
      fetchStats(res.data)

    }catch(error){
      console.log(error?.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => {
    fetchApplications()
  }

  const handleDelete = async (id)=>{
    try{
      const token = localStorage.getItem("token")

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/applications/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      refresh()

    }catch(error){
      console.log(error?.response?.data || error.message)
    }
  }

  const handleUpdate = async(id, status)=>{
    try{
      const token = localStorage.getItem("token")

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/applications/${id}`,
        { status },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      refresh()

    }catch(error){
      console.log(error?.response?.data || error.message)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/Login")
  }

  const filteredApps = apps.filter(app => {
    return (
      app.company.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || app.status === filter)
    )
  })

  const sortedApps = [...filteredApps].sort((a, b) => {
    if (sort === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    if (sort === "company") {
      return a.company.localeCompare(b.company)
    }
    return 0
  })

  if (loading) {
    return <h2 style={{textAlign:"center", marginTop:"50px"}}>Loading...</h2>
  }

  return(
    <div style={{background:"#f1f3f4", minHeight:"100vh"}}>

      {/* NAVBAR */}
      <div style={{
        background:"#1a73e8",
        color:"white",
        padding:"15px 30px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
        <h2 style={{margin:0}}>CareerTrack</h2>
        <button onClick={handleLogout} style={{
          background:"white",
          color:"#1a73e8",
          border:"none",
          padding:"8px 14px",
          borderRadius:"6px",
          cursor:"pointer"
        }}>
          Logout
        </button>
      </div>

      <div style={{
        maxWidth:"1000px",
        margin:"auto",
        padding:"30px"
      }}>

        {/* HEADER */}
        <h1 style={{
          textAlign:"center",
          color:"#1a73e8",
          marginBottom:"24px"
        }}>
          Dashboard
        </h1>

        {/* STATS */}
        <div style={{
          display:"flex",
          gap:"15px",
          marginBottom:"30px"
        }}>
          <StatCard title="Applied" value={stats.Applied} color="#4285F4"/>
          <StatCard title="Interview" value={stats.Interview} color="#FBBC05"/>
          <StatCard title="Rejected" value={stats.Rejected} color="#EA4335"/>
          <StatCard title="Offer" value={stats.Offer} color="#34A853"/>
        </div>

        {/* CONTROLS */}
        <div style={{
          display:"flex",
          gap:"10px",
          marginBottom:"25px"
        }}>
          <input
            placeholder="Search company..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={inputStyle}
          />

          <select onChange={(e)=>setFilter(e.target.value)} style={inputStyle}>
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>

          <select onChange={(e)=>setSort(e.target.value)} style={inputStyle}>
            <option value="latest">Latest</option>
            <option value="company">Company</option>
          </select>
        </div>

        {/* ADD */}
        <div style={{marginBottom:"30px"}}>
          <AddApplication refresh={refresh}/>
        </div>

        {/* LIST */}
        {sortedApps.length === 0 ? (
          <p style={{textAlign:"center", color:"gray"}}>
            No applications found
          </p>
        ) : (
          sortedApps.map((app)=>(
            <div key={app._id} style={cardStyle}>

              <div>
                <h3 style={{margin:"0"}}>{app.company}</h3>
                <p style={{margin:"5px 0"}}>{app.role}</p>
                <p style={{fontSize:"12px", color:"gray"}}>
                  {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : ""}
                </p>
              </div>

              <div>
                <select
                  value={app.status}
                  onChange={(e)=>handleUpdate(app._id, e.target.value)}
                  style={inputStyle}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                  <option>Offer</option>
                </select>

                <button 
                  onClick={()=>handleDelete(app._id)}
                  style={deleteBtn}
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  )
}


const StatCard = ({title, value, color}) => (
  <div style={{
    flex:1,
    background:"white",
    padding:"20px",
    borderRadius:"10px",
    textAlign:"center",
    boxShadow:"0 2px 6px rgba(0,0,0,0.1)",
    borderTop:`4px solid ${color}`
  }}>
    <p style={{margin:0, color:"gray"}}>{title}</p>
    <h2 style={{margin:"5px 0"}}>{value}</h2>
  </div>
)

const inputStyle = {
  padding:"10px",
  borderRadius:"8px",
  border:"1px solid #ccc"
}

const cardStyle = {
  padding:"20px",
  marginBottom:"15px",
  borderRadius:"10px",
  background:"#ffffff",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
}

const deleteBtn = {
  marginLeft:"10px",
  padding:"8px 12px",
  background:"#EA4335",
  color:"white",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer"
}

export default Dashboard