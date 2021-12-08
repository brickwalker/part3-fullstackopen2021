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

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((entries) => res.json(entries))
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name) {
    next(new Error("name missing"));
  }

  if (!body.number) {
    next(new Error("number missing"));
  }

  Person.findOne({ name: body.name })
    .then((entry) => {
      if (entry) {
        next(new Error(`name ${entry.name} already exists`));
      } else {
        const newContact = new Person({
          name: body.name,
          number: body.number,
        });
        newContact.save().then((savedContact) => res.json(savedContact));
      }
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((entry) => {
      if (entry) {
        res.json(entry);
      } else {
        next(new Error("not found"));
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((entry) => {
      if (entry) {
        res.status(204).end();
      } else {
        next(new Error("not found"));
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const updateRecord = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, updateRecord, { new: true })
    .then((entry) => res.json(entry))
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  Person.find({})
    .then((entries) =>
      res.send(`<div>
                  <p>Phonebook has info for ${entries.length} people</p>
                  <p>${new Date()}</p>
                </div>`)
    )
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) =>
  res.status(404).json({ error: "unknown endpoint" });

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.message === "not found") {
    res.status(404);
  } else {
    res.status(400);
  }

  if (err.name === "CastError") {
    res.json({ error: "malformed id" });
  }

  res.json({ error: err.message });

  next(err);
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Phonebook api listening at ${port}`);
});
