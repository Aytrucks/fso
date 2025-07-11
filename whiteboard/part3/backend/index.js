require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Note = require("./models/note");

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("tiny"));

// const reqLogger = (request, response, next) => {
//   console.log("What method: ", request.method);
//   console.log("What Path: ", request.path);
//   console.log("Body: ", request.body);
//   console.log("-----");
//   next();
// };

// app.use(reqLogger);

// const darkEndpoint = (request, response) => {
//   response.status(404).send({ error: "Bro wtf kinda endpoint is this??" });
// };

// app.use(darkEndpoint);

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: true,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("hello, world");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const biggestId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(biggestId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

const unknownEP = (req, res) => {
  res.status(404).send({ error: "unknown endpoint (why ru here)" });
};

app.use(unknownEP);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server b runnin on that port over on ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);
