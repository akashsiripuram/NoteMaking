require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const userRoute=require("./routes/user.route");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth",userRoute);  

app.listen(8080, () => {
  console.log("listening to a port of 8080");
});
