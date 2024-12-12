import axios from "axios";
import baseURL from "@/config/backUrl";

const postsUrl = `${baseURL}/posts`;

//get post by id
export const getPost = async (post_id) => {
  try {
    const response = await axios.get(`${postsUrl}/${post_id}`);
    return response.data;
  } catch (error) {
    return {};
  }
};

//get all posts
export const getPosts = async() => {
  try {
    const response = await axios.get(postsUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}