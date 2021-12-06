const express = require("express");
const data = require("./data.json");

const app = express();
const port = 3001;

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Phonebook api listening at http://localhost:${port}`);
});
