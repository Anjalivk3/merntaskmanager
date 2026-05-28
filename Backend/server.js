const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoDb = require("./config/db");
const authRouter = require("./routes/authRouter");
const taskRouter = require("./routes/taskRouter");
dotenv.config();
const app = express();
connectMongoDb();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);



// app.get("/ping", (req,res)=>{
//   res.send("hello");
// })
app.listen(PORT, ()=>{
  console.log("server is running on port : ", PORT);
})

