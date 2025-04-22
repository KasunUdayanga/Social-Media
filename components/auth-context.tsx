"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { users } from "@/lib/data"

// Define the user type
interface User {
  id: string
  name: string
  username: string
  avatar: string
}

// Define the auth context type
interface AuthContextType {
  user: User | null
  login: () => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  // In a real app, you would check for an existing session
  const [user, setUser] = useState<User | null>(() => {
    // For demo purposes, we'll check if there's a stored user in localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("socialapp_user")
      if (storedUser) {
        try {
          return JSON.parse(storedUser)
        } catch (e) {
          return null
        }
      }
    }
    return null
  })

  useEffect(() => {
    // Simulate checking auth state
    const checkAuth = setTimeout(() => {
      setIsLoading(false)

      // If user is not authenticated and trying to access protected routes
      if (!user && pathname !== "/login" && pathname !== "/register") {
        router.push("/login")
      }
    }, 500)

    return () => clearTimeout(checkAuth)
  }, [user, pathname, router])

  const login = () => {
    // In a real app, this would involve authentication
    const currentUser = users.find((u) => u.id === "currentUser")
    setUser(currentUser || null)

    // Store user in localStorage for persistence
    if (currentUser && typeof window !== "undefined") {
      localStorage.setItem("socialapp_user", JSON.stringify(currentUser))
    }
  }

  const logout = () => {
    setUser(null)
    // Clear stored user
    if (typeof window !== "undefined") {
      localStorage.removeItem("socialapp_user")
    }
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
