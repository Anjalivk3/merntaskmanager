const cors = require("cors")
const express = require("express")
const dotenv = require("dotenv");
const connectMongoDb = require("./config/db.js")
dotenv.config();
const app = express();
connectMongoDb();
app.use(cors());
app.use(express.json());



app.listen(precess.env.PORT,()=>{
  console.log(`TaskManager server is running on port ${precess.env.PORT}`)
})