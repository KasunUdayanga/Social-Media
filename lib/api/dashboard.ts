import { getPosts } from "./posts"

export async function getUserPosts() {
  // In a real app, this would fetch only the current user's posts
  const allPosts = await getPosts()

  // Filter posts by the current user (using "user1" as an example)
  return allPosts.filter((post) => post.author._id === "user1")
}
