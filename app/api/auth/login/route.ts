import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // In a real app, you would verify credentials against your database
    // For demo purposes, we'll accept any valid email format and password length >= 6
    if (!email.includes("@") || password.length < 6) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Create a mock user
    const user = {
      _id: "currentUser",
      name: "Your Name",
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
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
