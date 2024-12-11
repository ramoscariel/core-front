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
