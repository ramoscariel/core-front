export const sortByLikes = (posts) => {
  return posts.sort((a, b) => {
    // Parse votes to numbers and compare
    return parseInt(b.votes, 10) - parseInt(a.votes, 10);
  });
};

export const sortByUpdatedCount = (posts) => {
    return posts.sort((a, b) => b.updated_count - a.updated_count);
};