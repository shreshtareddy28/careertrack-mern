import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Applied","Interview","Rejected","Offer"],
    default: "Applied"
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date
  },
  link: {
    type: String
  },
  notes: {
    type: String
  }
}, { timestamps: true })

const Application = mongoose.model("Application", applicationSchema)

export default Application