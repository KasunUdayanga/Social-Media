import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    // Get the auth token from cookies
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // In a real app, you would verify the token and fetch the user from the database
    // For demo purposes, we'll return a mock user if a token exists
    const user = {
      _id: "currentUser",
      name: "Your Name",
      email: "you@example.com",
      avatar: "/placeholder.svg",
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
