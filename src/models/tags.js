import axios from "axios";
import baseURL from "@/config/backUrl";

const tagsUrl = `${baseURL}/tags`;

// get post tags (by id)
export const getPostTags = async (post_id) => {
  try {
    const response = await axios.get(`${tagsUrl}/post/${post_id}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

// get all tags
export const getTags = async () => {
  try {
    const response = await axios.get(tagsUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// validate a tag exists
export const getTagByName = async (tag_name) => {
  try {
    const response = await axios.get(`${tagsUrl}/${tag_name}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTag = async (token, tag_name) => {
  try {
    const response = await axios.post(
      tagsUrl,
      {
        tag_name: tag_name.toLowerCase(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating tag:", error.response?.data || error.message);
    throw error;
  }
};

export const associateTagToPost = async (token, post_id, tag_id) => {
  try {
    const response = await axios.post(
      `${tagsUrl}/post/${post_id}`,
      {
        tag_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Asociacion ya existe");
  }
};

// delete all tags related to a post
export const deletePostTags = async (token, post_id) => {
  try {
    const response = await axios.delete(`${tagsUrl}/post/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting tags:", error);
    throw error; // Optionally rethrow the error for the caller to handle
  }
};