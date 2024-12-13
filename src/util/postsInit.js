// methods to add to posts other related data

import { getPostTags } from "@/models/tags";
import { getPostVotes } from "@/models/votes";

// mutate the original array
export const addTagsToPosts = async (posts) => {
  try {
    //iterate over all posts and add tags (array)
    for (const post of posts) {
      const post_id = post.post_id;
      const tags = await getPostTags(post_id);
      post.tags = tags;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// mutate the original array
export const addVotesToPosts =  async (posts) => {
  try {
    //iterate over all posts and add votes
    for (const post of posts) {
      const post_id = post.post_id;
      const votes = await getPostVotes(post_id);
      post.votes = votes;
    }
  } catch (error) {
    console.error("Error fetching votes:", error);
  }
};