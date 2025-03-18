require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const router = require("./routes/user.route");
const noteRouter = require("./routes/note.route")
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");
const app = express();
app.use(cors({origin:"https://note-making-flax.vercel.app",credentials:true}))
app.use(express.json())

app.use("/api",router);
app.use("/api/note",noteRouter)

app.get("/",(req,res)=>{
  res.send("Hello World")
})

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
