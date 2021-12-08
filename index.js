const { response } = require("express");
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: ".env.local" });
const Person = require("./models/Person");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("build"));
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
  Person.find({}).then((entries) => res.json(entries));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    res.status(400).json({ error: "name missing" }).end();
  }

  if (!body.number) {
    res.status(400).json({ error: "number missing" }).end();
  }

  Person.findOne({ name: body.name }).then((entry) => {
    if (entry) {
      res
        .status(400)
        .json({ error: `name ${entries.name} already exists` })
        .end();
    } else {
      const newContact = new Person({
        name: body.name,
        number: body.number,
      });
      newContact.save().then((savedContact) => res.json(savedContact));
    }
  });
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
