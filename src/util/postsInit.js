// method to add to posts their associated tags as an array

import { getPostTags } from "@/models/tags";

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
