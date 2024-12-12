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

// create vote
export const createVote = async (token, post_id, value) => {
  try {
    const response = await axios.post(
      `${votesUrl}/${post_id}`,
      { vote_value: value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update vote
export const editVote = async (token, post_id, value) => {
  try {
    const response = await axios.put(
      `${votesUrl}/${post_id}`,
      { vote_value: value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get user's vote on a post
export const getUserVote = async (user_id,post_id) => {
  try {
    const response = await axios.get(`${votesUrl}/user/post?user_id=${user_id}&post_id=${post_id}`);
    return response.data;
  } catch (error) {
    return {};
  }
};