import axios from "axios";
import baseURL from "@/config/backUrl";

const usersUrl = `${baseURL}/users`;

// get user by id
export const getUser = async (user_id) => {
  try {
    const response = await axios.get(`${usersUrl}/${user_id}`);
    return response.data;
  } catch (error) {
    return {};
  }
};