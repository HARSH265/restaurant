const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const passport = require('./auth');
const app = express();
const PORT = process.env.PORT || 8000;
const { connectDb } = require('./db');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

const startServer = async () => {
  try {
    await connectDb(process.env.URI);
    console.log('Connected to DB');

    app.get("/", (req, res) => {
      res.send("Welcome to the restaurant");
    });

    app.use('/person', personRoutes);
    app.use('/menu', menuRoutes);

    app.listen(PORT, () => {
      console.log(`Server is started at port: ${PORT}`);
    });
  } catch (error) {
    console.error("Can't connect to server", error);
    process.exit(1);
  }
};

startServer();
