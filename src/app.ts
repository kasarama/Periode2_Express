import express from "express";
import path from "path";
import dotenv from "dotenv";
import frienRouts from "./routes/frinedsRouts";
const debug = require("DEBUG")("app");
dotenv.config();
const app = express();
/*
app.use((req, res, next) => {
  //logging to console makes a mess, better is logging
  console.log(
    `${new Date().toLocaleTimeString()}\n${req.method}\n${req.url}\nip: ${
      req.ip
    }\nremoteAddres${req.connection.remoteAddress}`
  );

  console.log("request made");
  debug(
    `${new Date().toLocaleTimeString()}\n${req.method}\n${req.url}\nip: ${
      req.ip
    }\nremoteAddres${req.connection.remoteAddress}`
  );

  next();
});
*/
//app.use('/static', express.static('public'))
app.use(express.static(path.join(process.cwd(), "public"))); //cwd = current working directory
app.use(express.json());
app.get("/demo", (req, res) => {
  let a = 123;
  // a='dss' gives fail that typescripts wants it to be of the first instantiated
  console.log(a);
  res.send("Server is up!!.!");
});

app.use("/api/friends", frienRouts);

export default app;
