import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getPersons = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    throw new Error("Failed to get persons", err);
  }
};

const addPerson = async (person) => {
  try {
    const response = await axios.post(baseURL, person);
    return response.data;
  } catch (err) {
    throw new Error("Failed to add person", err);
  }
};

const deletePerson = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error("Failed to delete person", err);
  }
};

const updatePerson = async (person) => {
  try {
    const response = await axios.put(`${baseURL}/${person.id}`, person);
    return response.data;
  } catch (err) {
    throw new Error("Failed to update person", err);
  }
};

export default { getPersons, addPerson, deletePerson, updatePerson };
