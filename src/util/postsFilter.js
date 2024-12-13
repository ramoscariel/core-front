export const filterPosts = (posts, title, fromDate, toDate, tags) => {
  let filteredPosts = posts;

  // Filter by title
  if (title.trim() !== "") {
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  // Filter by date
  if (fromDate) {
    const from = new Date(fromDate).setUTCHours(0, 0, 0, 0); // Normalize to UTC start of the day
    filteredPosts = filteredPosts.filter((post) => {
      const postDate = new Date(post.creation_time).setUTCHours(0, 0, 0, 0); // Normalize post date to UTC start of the day
      return postDate >= from;
    });
  }

  if (toDate) {
    const to = new Date(toDate).setUTCHours(23, 59, 59, 999); // Normalize to UTC end of the day
    filteredPosts = filteredPosts.filter((post) => {
      const postDate = new Date(post.creation_time).setUTCHours(23, 59, 59, 999); // Normalize post date to UTC end of the day
      return postDate <= to;
    });
  }

  // Filter by tags
  if (tags.length > 0) {
    filteredPosts = filteredPosts.filter((post) => {
      if (!post.tags || post.tags.length === 0) return false; // Skip posts with no tags

      // Check if all provided tags match
      return tags.every((filterTag) =>
        post.tags.some((tag) => filterTag === tag.tag_name)
      );
    });
  }

  return filteredPosts;
};