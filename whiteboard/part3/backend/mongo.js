const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as arg");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://anishnalla:${password}@cluster0.wdo7gtx.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note has been saved to el db");
  mongoose.connection.close();
});
