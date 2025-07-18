const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crossUnblocker = require("./middileware/cros-unblocker");
const path = require("path");
require('dotenv').config();
const favicon = require('serve-favicon');
// Cross Unblocked File..
const cors = require("cors");
const errorHandler = require("./middileware/error-handler");

/**
 *  Router File Import
 */

const taskRoutes = require("./routes/tasks");



const app = express();

app.use(crossUnblocker.allowCross);
app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));






app.use("/api/tasks", taskRoutes);



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(errorHandler.route);
app.use(errorHandler.next);

// deployment product type 1

mongoose.set('strictQuery', false);
mongoose
  .connect(
    `mongodb://0.0.0.0:27017/${process.env.DB_NAME}`,
    // `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/${process.env.DB_NAME}?authSource=${process.env.AUTH_SOURCE}`,
    // `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
    // {
      // useNewUrlParser: true,
      //  useFindAndModify: false,
      // useUnifiedTopology: true,
      //  useCreateIndex: true
    // }
  )
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server is running at port:${port}`));
  })
  .catch((err) => {
    console.error("Oops! Could not connect to mongoDB Cluster0", err);
  });


  module.exports = app;