const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();
const PORT = 8000;
const { connectDb } = require('./db');
const personRoutes=require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectDb('mongodb://127.0.0.1:27017/hotels');
    console.log('connected to db');

    app.get("/", (req, res) => {
      res.send("welcome to restaurent");
    });

    
    

    app.use('/person',personRoutes)
    app.use('/menu',menuRoutes)

    

    app.listen(PORT, () => {
      console.log(`server is started at port: ${PORT}`);
    });
  } catch (error) {
    console.error("can't connect to server", error);
    process.exit(1);
  }
};

startServer();
