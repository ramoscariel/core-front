export const filterPosts = (posts, title, fromDate, toDate, tags) => {
  let filteredPosts = posts;

  // Filter by title
  if (title.trim() !== "") {
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  // filter by date
  if (fromDate) {
    const from = new Date(fromDate + "T00:00:00"); // Explicitly set to start of the day in local time
    filteredPosts = filteredPosts.filter((post) => {
      const postDate = new Date(post.creation_time);
      return postDate >= from;
    });
  }

  if (toDate) {
    const to = new Date(toDate + "T23:59:59"); // Explicitly set to end of the day in local time
    filteredPosts = filteredPosts.filter((post) => {
      const postDate = new Date(post.creation_time);
      return postDate <= to;
    });
  }

  // filter by tags
  if (tags.length > 0) {
    filteredPosts = filteredPosts.filter((post) => {
      // skip posts with no tags
      if (!post.tags || post.tags.length === 0) return false;

      // check if all provided tags match
      return tags.every((filterTag) =>
        post.tags.some((tag) => filterTag === tag.tag_name)
      );
    });
  }

  return filteredPosts;
};
