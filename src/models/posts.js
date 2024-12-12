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
export const getPosts = async () => {
  try {
    const response = await axios.get(postsUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// get user's liked posts

export const getLikedPosts = async (user_id) => {
  try {
    const response = await axios.get(`${postsUrl}/liked/${user_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// get user's published posts

export const getPostedPosts = async (user_id) => {
  try {
    const response = await axios.get(`${postsUrl}/posted/${user_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//create post
export const createPost = async (
  token,
  title,
  content,
  parentPostId = null
) => {
  try {
    const response = await axios.post(
      postsUrl,
      {
        title,
        content,
        parent_post_id: parentPostId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for further handling
  }
};
