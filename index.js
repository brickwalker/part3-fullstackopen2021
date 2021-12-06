const { response } = require("express");
const express = require("express");
const fs = require("fs");
const data = require("./data.json");

const app = express();
const port = 3001;

app.use(express.json());

const getEntriesNumber = () => (data ? data.length : 0);

const writeData = (data, callback) =>
  fs.writeFile("./data.json", JSON.stringify(data), callback);

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const id = getEntriesNumber() * 10 + Math.floor(Math.random() * 10);

  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }

  const entry = {
    id,
    name: body.name,
    number: body.number,
  };

  writeData([...data, entry], () => res.json(entry));
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
    writeData(newData, () => res.status(204).end());
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  res.send(`<div>
                <p>Phonebook has info for ${getEntriesNumber()} people</p>
                <p>${new Date()}</p>
            </div>`);
});

app.listen(port, () => {
  console.log(`Phonebook api listening at http://localhost:${port}`);
});
