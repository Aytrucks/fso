import axios from "axios";

//url for notes
const url = "http://localhost:3002/notes/";

const getAll = () => {
  return axios.get(url);
};

const createNote = (newNote) => {
  return axios.post(url, newNote);
};

const update = (id, newNote) => {
  //find url of note to be updated
  return axios.put(`${url}/${id}`, newNote);
};

export default {
  getAll: getAll,
  createNote: createNote,
  update: update,
};
