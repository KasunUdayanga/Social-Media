"use server"

import { revalidatePath } from "next/cache"
import { initialPosts, type Post, type Comment } from "@/lib/data"

// In-memory storage for posts (simulating a database)
let posts = [...initialPosts]

// Generate a simple ID
function generateId() {
  return Math.random().toString(36).substring(2, 15)
}

// Format timestamp
function getTimestamp() {
  return "Just now"
}

// Create a new post
export async function createPost(formData: FormData) {
  const content = formData.get("content") as string

  if (!content || content.trim() === "") {
    return { error: "Post content cannot be empty" }
  }

  const newPost: Post = {
    id: generateId(),
    authorId: "currentUser", // Assuming the current user
    content,
    timestamp: getTimestamp(),
    likes: [],
    comments: [],
  }

  // Add the new post to the beginning of the array
  posts = [newPost, ...posts]

  // Revalidate the home page to show the new post
  revalidatePath("/")

  return { success: true }
}

// Toggle like on a post
export async function toggleLike(postId: string, userId = "currentUser") {
  const postIndex = posts.findIndex((post) => post.id === postId)

  if (postIndex === -1) {
    return { error: "Post not found" }
  }

  const post = posts[postIndex]
  const likeIndex = post.likes.indexOf(userId)

  // If user already liked the post, remove the like
  if (likeIndex !== -1) {
    post.likes.splice(likeIndex, 1)
  } else {
    // Otherwise, add the like
    post.likes.push(userId)
  }

  // Update the post in the array
  posts[postIndex] = post

  // Revalidate the home page
  revalidatePath("/")

  return { success: true, liked: likeIndex === -1 }
}

// Add a comment to a post
export async function addComment(postId: string, content: string, userId = "currentUser") {
  if (!content || content.trim() === "") {
    return { error: "Comment cannot be empty" }
  }

  const postIndex = posts.findIndex((post) => post.id === postId)

  if (postIndex === -1) {
    return { error: "Post not found" }
  }

  const newComment: Comment = {
    id: generateId(),
    authorId: userId,
    content,
    timestamp: getTimestamp(),
  }

  // Add the comment to the post
  posts[postIndex].comments.push(newComment)

  // Revalidate the home page
  revalidatePath("/")

  return { success: true, comment: newComment }
}

// Get all posts
export async function getPosts() {
  return posts
}

// Search posts
export async function searchPosts(query: string) {
  if (!query || query.trim() === "") {
    return posts
  }

  const lowercaseQuery = query.toLowerCase()

  return posts.filter((post) => post.content.toLowerCase().includes(lowercaseQuery))
}
