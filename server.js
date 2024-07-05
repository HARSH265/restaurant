const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config(); // Ensure this is called at the top

const app = express();
const PORT = process.env.PORT || 8000;
const { connectDb } = require('./db');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//console.log('Loaded URI:', process.env.URI); // Log the URI to verify
//console.log('Loaded PORT:', process.env.PORT); // Log the PORT to verify

const startServer = async () => {
  try {
    await connectDb(process.env.URI);
    console.log('connected to db');

    app.get("/", (req, res) => {
      res.send("welcome to restaurent");
    });

    app.use('/person', personRoutes);
    app.use('/menu', menuRoutes);

    app.listen(PORT, () => {
      console.log(`server is started at port: ${PORT}`);
    });
  } catch (error) {
    console.error("can't connect to server", error);
    process.exit(1);
  }
};

startServer();
