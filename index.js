const { response } = require("express");
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");

let data = [
  { id: 1, name: "King Danylo", number: "111-222-333" },
  { id: 2, name: "Kyrylo Kozhumiaka", number: "9922-3322-444" },
];

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("ui"));
app.use(cors());
app.use(express.json());
morgan.token("post-body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-body"
  )
);

const getEntriesNumber = () => (data ? data.length : 0);

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const id = getEntriesNumber() * 10 + Math.floor(Math.random() * 10);

  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  }

  if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }

  const nameExists = data.find((item) => item.name === body.name);
  if (nameExists) {
    return res.status(400).json({ error: "name already exists" });
  }

  const entry = {
    id,
    name: body.name,
    number: body.number,
  };

  data = [...data, entry];
  res.json(entry);
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
    data = data.filter((item) => item.id !== id);
    res.status(204).end();
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
  console.log(`Phonebook api listening at ${port}`);
});
