const express = require("express");
const app = express();

app.use(express.json());

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

const PORT = 3002;
app.listen(PORT, () => {
  console.log("Server running now");
});
