import axios from "axios";

const baseURL = "/api/persons";

const getPersons = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const addPerson = async (person) => {
  try {
    const response = await axios.post(baseURL, person);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const deletePerson = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const updatePerson = async (person) => {
  try {
    const response = await axios.put(`${baseURL}/${person.id}`, person);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export default { getPersons, addPerson, deletePerson, updatePerson };
