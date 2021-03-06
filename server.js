const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const connetDB = require("./config/db.js");
const path = require("path");
const errorHandler = require("./middleware/errorhandler.js");
const app = express();

//config path
dotenv.config({ path: "./config/config.env" });

//Routes import
const bootcamps = require("./routes/bootcamps.js");
const courses = require("./routes/courses.js");
const auth = require("./routes/auth.js");
//define main route & middleware
app.use(morgan("dev"));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use(errorHandler);
connetDB();

//port declaration and port listen
const port = process.env.PORT || 8000;
const server = app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT:${port}`.yellow.bold
  )
);

process.on("unhandledRejection", (err, promisee) => {
  console.log(`Error : ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
