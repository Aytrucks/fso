const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());

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

app.get("/", (request, response) => {
  const date = new Date();
  //console.log(date.toUTCString());
  response.send(
    `<h1>
    The Phones reside here
    </h1> 

    <div>
    There are ${phonebook.length} people in the phonebook rn
    </div

    <div>
    This was found at ${date.toUTCString()}
    </div>`
  );
});

app.get("/api/people", (request, response) => {
  response.json(phonebook);
});

app.get("/api/people/:id", (request, response) => {
  const id = request.params.id;
  const phonenum = phonebook.find((num) => num.id === id);
  if (!phonenum) {
    return response.status(400).json({
      error: "Person does not exist in the books",
    });
  }
  response.json(phonenum);
});

app.delete("/api/people/:id", (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter((person) => person.id !== id);
  console.log("Successfully deleted");
  response.status(204).end();
});

const makeId = () => {
  return String(Math.floor(5 + Math.random() * 100));
};

app.post("/api/people", (req, res) => {
  const note = req.body;
  if (!(note.number && note.name)) {
    return res.status(400).json({
      error: "Missing number or name to show",
    });
  }
  if (phonebook.find((num) => num.name === note.name)) {
    return res.status(400).json({
      error: "Name already in the book",
    });
  }
  const person = {
    id: makeId(),
    name: note.name,
    number: note.number,
  };
  phonebook = phonebook.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running now on ${PORT}`);
});
