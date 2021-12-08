const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
  name: {
    type: String,
    minLength: 3,
    maxLength: 24,
    required: true,
    unique: true,
  },
  number: { type: String, minLength: 8, maxLength: 24, required: true },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);

const personModel = mongoose.model("Person", personSchema);

module.exports = personModel;
