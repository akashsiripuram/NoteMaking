require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const router = require("./routes/user.route");
const noteRouter = require("./routes/note.route")
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");
const app = express();
app.use(cors())
app.use(express.json())

app.use("/api",router);
app.use("/api/note",noteRouter)

// app.use("/",(req,res)=>{
//   const body = req.body
//   res.send(req.body.name)
// })

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/protected-route",verifyToken,(req,res)=>{
  console.log(req.user);
  res.send("This is a protected route")
})

app.listen(5000, () => {
  console.log("listening to a port of 5000");
});
