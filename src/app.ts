import express from "express";
import path from "path";
import dotenv from "dotenv";
import frienRouts from "./routes/frinedsRouts";
dotenv.config();
const debug = require("DEBUG")("app");
const app = express();
import mylogger from "./middleware/simpleLogger";
import logger, { stream } from "./middleware/logger";
const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev";
app.use(require("morgan")(morganFormat, { stream }));
app.set("logger", logger); //This line sets the logger with a global key on the application object
//You can now use it from all your middlewares like this req.app.get("logger").log("info","Message")
//Level can be one of the following: error, warn, info, http, verbose, debug, silly
//Level = "error" will go to the error file in production
logger.log("info", "Server started"); //Example of how to use the logger
/*
my first middleware:
app.use((req, res, next) => {
 
  //logging to console makes a mess, better is debugging
  console.log("logging to console",
    `${new Date().toLocaleTimeString()}\n${req.method}\n${req.url}\nip: ${
      req.ip
    }\nremoteAddres${req.connection.remoteAddress}`
  );

  
  debug(
    `${new Date().toLocaleTimeString()}\n${req.method}\n${req.url}\nip: ${
      req.ip
    }\nremoteAddres${req.connection.remoteAddress}`
  );

  next();
});
*/
app.use(mylogger);
//app.use('/static', express.static('public'))
app.use(express.static(path.join(process.cwd(), "public"))); //cwd = current working directory
app.use(express.json());
app.get("/demo", (req, res) => {
  logger.log("info", "demo requested");
  logger.log("error", "some error");
  let a = 123;
  // a='dss' gives fail that typescripts wants it to be of the first instantiated
  console.log(a);
  res.send("Server is up!!.!");
});

app.use("/api/friends", frienRouts);

export default app;
