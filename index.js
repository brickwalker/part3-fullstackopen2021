const { response } = require("express");
const express = require("express");
const fs = require("fs");
const data = require("./data.json");

const app = express();
const port = 3001;

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((item) => item.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((item) => item.id === id);
  if (person) {
    const newData = data.filter((item) => item.id !== id);
    fs.writeFile("./data.json", JSON.stringify(newData), () => res.status(204).end());
  } else {
    res.status(404).end();
  }
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
