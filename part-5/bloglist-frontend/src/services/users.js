import axios from "axios";
const baseUrl = "/api/users";

const get = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export default { get };
