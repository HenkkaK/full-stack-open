import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const createConfig = (token) => {
  return {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  try {
    const config = createConfig(token);
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const create = async (newObject) => {
  try {
    const config = createConfig(token);
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const update = async (id, newObject) => {
  try {
    const config = createConfig(token);
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const deleteBlog = async (id) => {
  try {
    const config = createConfig(token);
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export default { getAll, create, update, setToken, deleteBlog };
