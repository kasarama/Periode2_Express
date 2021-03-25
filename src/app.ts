import express from "express";

import path from "path";

import dotenv from "dotenv";

import facade from ".//facades/DummyDB-Facade";

import frienRouts from "./routes/frinedsRouts";
dotenv.config();
const app = express();

//app.use('/static', express.static('public'))
app.use(express.static(path.join(process.cwd(), "public"))); //cwd = current working directory
app.use(express.json())
app.get("/demo", (req, res) => {
  let a = 123;
  // a='dss' gives fail that typescripts wants it to be of the first instantiated
  console.log(a);
  res.send("Server is up!!.!");
});

app.use("/api/friends", frienRouts);

export default app;
