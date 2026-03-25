import { useState } from "react"
import axios from "axios"

function AddApplication({ refresh }) {

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    link: "",
    deadline: "",
    notes: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")

      await axios.post(
        "http://localhost:3001/api/applications",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Application Added Successfully")

      setForm({
        company: "",
        role: "",
        status: "Applied",
        link: "",
        deadline: "",
        notes: ""
      })

      refresh()

    } catch (error) {
      console.log(error?.response?.data || error.message)
      alert("Error adding application")
    }
  }

  return (
    <div>
      <h3>Add Application</h3>

      <form onSubmit={handleSubmit}>

        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <input name="link" placeholder="Application Link" value={form.link} onChange={handleChange} />

        <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />

        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />

        <button type="submit">Add</button>

      </form>
    </div>
  )
}

export default AddApplication