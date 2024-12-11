import axios from "axios";
import baseURL from "@/config/backUrl";

const votesUrl = `${baseURL}/votes`;

// get post votes (by id)
export const getPostVotes = async (post_id) => {
  try {
    const response = await axios.get(`${votesUrl}/post/${post_id}`);
    return response.data.vote_count;
  } catch (error) {
    return 0;
  }
};
