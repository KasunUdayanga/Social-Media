import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    // Check authentication
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const { title, content, excerpt, tags } = await request.json()

    // Validate input
    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 })
    }

    // In a real app, you would save the post to the database
    // For demo purposes, we'll return a mock post
    const newPost = {
      _id: "new-post-" + Date.now(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + (content.length > 150 ? "..." : ""),
      author: {
        _id: "currentUser",
        name: "Your Name",
        avatar: "/placeholder.svg",
      },
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      tags: tags || [],
    }

    return NextResponse.json(newPost)
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
