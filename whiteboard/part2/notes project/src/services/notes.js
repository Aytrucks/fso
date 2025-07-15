import axios from "axios";

//url for notes
const url = "/api/notes";

//handles defining axios methods in this library and exports methods
const getAll = () => {
  const request = axios.get(url);

  return request
    .then((output) => {
      return output.data;
    })

    .catch((error) => {
      console.log("damn bruh wtf happened");
    });
};

const createNote = (newNote) => {
  const request = axios.post(url, newNote);
  return request.then((response) => response.data);
};

const update = (id, newNote) => {
  //find url of note to be updated
  const request = axios.put(`${url}/${id}`, newNote);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  createNote: createNote,
  update: update,
};
