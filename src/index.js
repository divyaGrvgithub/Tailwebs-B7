const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const route = require("./routes/route");
const app = express();
const multer = require('multer');

app.use(express.json());
app.use(cors())
app.use(multer().any());

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://divyamala_:Dt25042000knp@divyamala.0cofsch.mongodb.net/Tailwebs",{
     useNewUrlParser: true 
})
  .then(() => {console.log("mongoDB is connected")})
  .catch((err) => {console.log(err)});

app.use("/", route);

app.listen(process.env.Port||3001, () => {
  console.log("Express App Running Onn Port"+(process.env.Port||3001));
});