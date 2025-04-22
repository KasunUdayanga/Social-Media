import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 })
    }

    // In a real app, you would check if the email is already in use
    // and hash the password before saving to the database

    // Create a mock user
    const user = {
      _id: "currentUser",
      name,
      email,
      avatar: "/placeholder.svg",
    }

    // Generate a mock JWT token
    const token = "mock_jwt_token_" + Date.now()

    // Set a cookie with the token
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
    })

    return NextResponse.json({ user, token })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
