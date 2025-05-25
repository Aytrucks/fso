import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const addPerson = (person) => {
  const request = axios.post(url, person);
  return request.then((response) => response.data);
};

//Delete request
const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request;
};

//Update user's phonenumber
const updateNumber = (number, id) => {
  const request = axios.put(`${url}/${id}`, number);
  return request.then((response) => response.data);
};

export default { getAll, addPerson, deletePerson, updateNumber };
