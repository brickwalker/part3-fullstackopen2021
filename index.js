const express = require("express");
const data = require("./data.json");

const app = express();
const port = 3001;

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/info", (req, res) => {
const len = data ? data.length : 0;
  res.send(`<div>
                <p>Phonebook has info for ${len} people</p>
                <p>${new Date()}</p>
            </div>`);
});

app.listen(port, () => {
  console.log(`Phonebook api listening at http://localhost:${port}`);
});
