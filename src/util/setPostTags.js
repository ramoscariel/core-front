import { getTagByName,createTag,associateTagToPost } from "@/models/tags";

export const associateTagsToPost = async (token, post_id, tags) => {
  for (const tag of tags) {
    let tag_id = null;
    try {
      if (tag.tag_name.trim() === "") {
        continue;
      }

      if (tag.tag_id === null) {
        const tagByName = await getTagByName(tag.tag_name);
        // create a new tag
        if (tagByName.length === 0) {
          const createTagResponse = await createTag(
            token,
            tag.tag_name.toLowerCase()
          );
          tag_id = createTagResponse.tagId;
        }
        // associate existing tag to post
        else {
          tag_id = tagByName[0].tag_id;
        }
      } else {
        tag_id = tag.tag_id;
      }
      try {
        associateTagToPost(token, post_id, tag_id);
      } catch {
        continue;
      }
    } catch (error) {
      continue;
    }
  }
};
