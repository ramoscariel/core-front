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

export const loginUser = async (mail, pass) => {
  try {
    const response = await axios.post(`${usersUrl}/login`, {
      email: mail,
      password: pass,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const registerUser = async (mail, name, pass) => {
  try {
    const response = await axios.post(`${usersUrl}/register`, {
      username: name,
      email: mail,
      password: pass,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
