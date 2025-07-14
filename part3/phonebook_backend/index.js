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

app.get("/api/health", (request, response) => {
  response.send("Server is running!");
});

app.get("/info", (request, response, next) => {
  Entry.countDocuments({})
    .then((count) => {
      const currentTime = new Date();
      const info = {
        count: count,
        date: currentTime.toString(),
      };
      response.json(info);
    })
    .catch(next);
});

app.get("/api/people", (request, response) => {
  Entry.find({}).then((nums) => {
    response.json(nums);
  });
});

app.get("/api/people/:id", (request, response, next) => {
  Entry.findById(request.params.id)
    .then((num) => {
      if (num) {
        response.json(num);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      error = next(error);
    });
});

app.delete("/api/people/:id", (request, response, next) => {
  const id = request.params.id;
  Entry.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/people/:id", (req, res, next) => {
  const { name, number } = req.body;
  Entry.findById(req.params.id)
    .then((entry) => {
      if (!entry) {
        res.status(404).end();
      }
      entry.name = name;
      entry.number = number;
      return entry.save().then((newEntry) => {
        res.json(newEntry);
      });
    })
    .catch((error) => next(error));
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

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "messed up ID" });
  }
  next(error);
};

app.use(errorHandler);
