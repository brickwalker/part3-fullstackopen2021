const mongoose = require("mongoose");

const cluster = process.env.MONGO_CLUSTER;
const db = process.env.MONGO_DB;
const user = process.env.MONGO_USR;
const pwd = process.env.MONGO_PWD;

const connectionString = `mongodb+srv://${user}:${pwd}@${cluster}/${db}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error.message));

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

const personModel = mongoose.model("Person", personSchema);

module.exports = personModel;
