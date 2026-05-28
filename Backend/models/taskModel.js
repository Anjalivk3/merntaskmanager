const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {type:String, required: true},  
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  },
  description: String,
  dueDate: Date,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
}, {timestamps: true});


const taskModel = mongoose.model("Task", taskSchema);
module.exports = taskModel;