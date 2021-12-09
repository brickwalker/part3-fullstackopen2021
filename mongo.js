const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const usr = process.env.MONGO_USR;
const pwd = encodeURIComponent(process.env.MONGO_PWD);
const db = "phonebook";
const name = process.argv[2];
const number = process.argv[3];
let connectionString;

if (usr && pwd && db) {
  connectionString = `mongodb+srv://${usr}:${pwd}@fsocluster0.2qree.mongodb.net/${db}?retryWrites=true&w=majority`;
} else {
  console.error("DB connection string cannot be created.");
  process.exit(1);
}

mongoose.connect(connectionString);
const Person = mongoose.model("Person", { name: String, number: String });
const logEntries = () => {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.map((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
};

if (name && number) {
  const contact = { name, number };
  const newContact = new Person(contact);
  newContact.save().then(() => {
    console.log(`added: ${JSON.stringify(contact)}`);
    logEntries();
  });
} else {
  logEntries();
}
