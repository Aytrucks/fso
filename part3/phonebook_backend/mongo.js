const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log("Fill in the password, name, and number");
  process.exit(1);
}

const dbpassword = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://anishnalla:${dbpassword}@phonebook.aocve4w.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=phonebook`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model("Entry", entrySchema);

const entry = new Entry({
  name: name,
  number: number,
});

entry.save().then((response) => {
  console.log("Entry has been saved onto the phonebook");
  mongoose.connection.close();
});

// Entry.find({}).then((result) => {
//   result.forEach((entry) => {
//     console.log(entry);
//   });
//   mongoose.connection.close();
// });
