const taskModel = require("../models/taskModel");

const getTasks = async(req, res)=>{
  try {
    const tasks = await taskModel.find({
      userId: req.user.id
    });
    res.status(200).json({ success:true, tasks}).sort({createdAt: -1});
  } catch (error) {
    res.status(500).json({error: error.message, success: false});
  }
}


const createTasks = async(req, res)=>{
  try {
    const {title, description, dueDate, status, priority} = req.body;
    const newtask = await taskModel.create({
      title, description, dueDate, status, priority, userId: req.user.id
    })

    res.status(201).json({message:"Task added successfully", success: true, newtask});
    
  } catch (error) {
    res.status(500).json({error: error.message, success: false});
  }
}


const editTasks = async(req, res)=>{
  try {
    const {id} = req.params;
    const task = await taskModel.findOne({_id:id, userId: req.user.id})
    if(!task){
      return res.status(404).json({success: false, message: "Task not found"})

    }
    const updatedTask = taskModel.findByIdAndUpdate(id, req.body, {new:true})

    res.status(200).json({success:true, message: "Task updated successfully", updatedTasks});
  } catch (error) {
    res.status(500).json({error: error.message, success: false});
  }
}


const toggleTaskStatus = async(req, res)=>{
  try {
    const {id} = req.params;
    const task = await taskModel.findOne({_id:id, userId: req.user.id})
    if(!task){
      return res.status(404).json({success: false, message: "Task not found"})

    }

    task.status = task.status === "Pending"? "Completed": "Pending";
    await taskModel.save();

    res.status(200).json({success: true, message: "Task status updated", task});
    
  } catch (error) {
    res.status(500).json({error: error.message, success: false});
  }
}


const deleteTasks = async(req, res)=>{
  try {
    const {id} = req.params;
    const task = await taskModel.findOne({_id:id, userId: req.user.id})
    if(!task){
      return res.status(404).json({success: false, message: "Task not found"})

    }

    await taskModel.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "Task deleted successfully"})

    
  } catch (error) {
    res.status(500).json({error: error.message, success: false});
  }
}



module.exports = {getTasks, createTasks, editTasks, toggleTaskStatus, deleteTasks}  
