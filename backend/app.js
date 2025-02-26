require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const router = require("./routes/user.route");
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())

app.use("/api",router);

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


app.listen(5000, () => {
  console.log("listening to a port of 5000");
});
