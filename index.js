
const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const firmRouter = require('./routes/firmRouter');
const bodyParser = require("body-parser");
const productRouter = require("./routes/productRouter")
const path = require('path')

const app = express();
const PORT = 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Successfully mongodb connected"))
  .catch((error) => console.log("MongoDB connection error:", error));


app.use(express.json());
app.use(bodyParser.json());

app.use('/vendor', vendorRoutes);
app.use('/firm', firmRouter);
app.use('/product', productRouter)
app.use('/uploads', express.static('uploads') );


app.listen(PORT, () => {
  console.log(`server is connected, ${PORT}`);
});


app.use('/home', (req, res) =>{
  res.send("<h1> welcome to Restar")
})