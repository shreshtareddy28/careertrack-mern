import { useEffect, useState } from "react"
import axios from "axios"
import AddApplication from "../components/AddApplication"

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

  useEffect(()=>{
    fetchApplications()
  },[])

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
        "http://localhost:3001/api/applications",
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res && res.data) {
        setApps(res.data)
        fetchStats(res.data)
      }

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
        `http://localhost:3001/api/applications/${id}`,
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
      console.log(error?.response?.data || error.message)
    }
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

  // 🎨 GOOGLE-LIKE BLUE THEME
  const container = {
    maxWidth: "950px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    background: "#f1f3f4",
    minHeight: "100vh"
  }

  const header = {
    textAlign: "center",
    marginBottom: "25px",
    color: "#1a73e8"
  }

  const statsContainer = {
    display: "flex",
    gap: "15px",
    justifyContent: "space-between"
  }

  const cardStyle = {
    flex: 1,
    padding: "18px",
    background: "#ffffff",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    borderTop: "4px solid #1a73e8"
  }

  const controls = {
    marginTop: "30px",
    display: "flex",
    gap: "10px"
  }

  const inputStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }

  const selectStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }

  const appCard = {
    padding: "20px",
    margin: "15px 0",
    borderRadius: "10px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }

  const deleteBtn = {
    marginLeft: "10px",
    padding: "8px 12px",
    background: "#d93025",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }

  if (loading) {
    return <h2 style={{textAlign:"center"}}>Loading...</h2>
  }

  return(
  <div style={container}>

    <h1 style={header}>CareerTrack Dashboard</h1>

    {/* STATS */}
    <div style={statsContainer}>
      <div style={cardStyle}>Applied: {stats.Applied}</div>
      <div style={cardStyle}>Interview: {stats.Interview}</div>
      <div style={cardStyle}>Rejected: {stats.Rejected}</div>
      <div style={cardStyle}>Offer: {stats.Offer}</div>
    </div>

    {/* CONTROLS */}
    <div style={controls}>
      <input
        placeholder="Search company..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={inputStyle}
      />

      <select onChange={(e)=>setFilter(e.target.value)} style={selectStyle}>
        <option>All</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <select onChange={(e)=>setSort(e.target.value)} style={selectStyle}>
        <option value="latest">Latest</option>
        <option value="company">Company</option>
      </select>
    </div>

    {/* ADD */}
    <div style={{marginTop:"30px"}}>
      <AddApplication refresh={refresh}/>
    </div>

    {/* LIST */}
    <div style={{marginTop:"30px"}}>
      {sortedApps.length === 0 ? (
        <p style={{textAlign:"center"}}>No applications found</p>
      ) : (
        sortedApps.map((app)=>(
          <div key={app._id} style={appCard}>

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
                style={selectStyle}
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

export default Dashboard