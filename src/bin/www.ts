import app from "../app";

/*
not working: 
import d from "debug";
const debug = d("www");
*/
const debug = require("DEBUG")("www");

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Litening on port ${PORT}`);
  debug(`Server started.Litening on port ${PORT}`);
});
