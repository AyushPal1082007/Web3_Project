const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/classify", (req, res) => {

  const text = req.body.text.toLowerCase();

  let category = "leisure";

  if (text.includes("study")) category = "study";
  else if (text.includes("work")) category = "work";
  else if (text.includes("gym") || text.includes("run")) category = "exercise";

  res.json({ category });

});

app.get("/", (req, res) => {
  res.send("AI Backend Running");
});

app.listen(5000, () => {
  console.log("Server running");
});