require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Entry = require("./models/entry");

app.use(express.static("dist"));
app.use(express.json());
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/health", (request, response) => {
  response.send("Server is running!");
});

app.get("/api/people", (request, response) => {
  Entry.find({}).then((nums) => {
    response.json(nums);
  });
});

app.get("/api/people/:id", (request, response) => {
  Entry.findById(request.params.id).then((num) => {
    response.json(num);
  });
});

app.delete("/api/people/:id", (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter((person) => person.id !== id);
  console.log("Successfully deleted");
  response.status(204).end();
});

app.post("/api/people", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "missing name or number",
    });
  }

  const entry = new Entry({
    name: body.name,
    number: body.number,
  });

  entry.save().then((savedEntry) => {
    res.json(savedEntry);
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running now on ${PORT}`);
});
