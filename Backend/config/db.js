const mongoose = require("mongoose");

const connectMongoDb = async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`taskmanager MongoDB Connected  ${conn.connection.host}`);
    
  } catch (error) {
    console.error("Mongodb connection failed", error.message);
    process.exit(1);
  }
}

module.exports = connectMongoDb;