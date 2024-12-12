// methods to get posts with their associated tags as an array

import { getPosts } from "@/models/posts";
import { getPostTags } from "@/models/tags";

export const getAllPosts = async () => {
  let allPosts = [];
  try {
    allPosts = await getPosts();

    //iterate over all posts and add tags (array)
    for (const post of allPosts) {
      const post_id = post.post_id;
      const tags = await getPostTags(post_id);
      post.tags = tags;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  return allPosts;
};
