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
  twoFactorEnabled?: boolean
  securityQuestions?: boolean
  lastLogin?: string
  activeSessions?: {
    id: string
    device: string
    location: string
    lastActive: string
  }[]
}

// Define the auth context type
interface AuthContextType {
  user: User | null
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<{ success: boolean; error?: string; requiresTwoFactor?: boolean }>
  logout: (fromAllDevices?: boolean) => void
  completeLogin: (code: string) => Promise<{ success: boolean; error?: string }>
  isAuthenticated: boolean
  isLoading: boolean
  updateUserSecurity: (settings: Partial<User>) => void
  terminateSession: (sessionId: string) => void
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockoutUntil, setLockoutUntil] = useState<Date | null>(null)
  const [pendingTwoFactorAuth, setPendingTwoFactorAuth] = useState(false)
  const [pendingUser, setPendingUser] = useState<User | null>(null)

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
      const publicRoutes = ["/login", "/register", "/forgot-password", "/two-factor"]
      if (!user && !publicRoutes.includes(pathname) && !pathname.startsWith("/reset-password")) {
        router.push("/login")
      }

      // If user is authenticated and trying to access auth routes
      if (user && (pathname === "/login" || pathname === "/register")) {
        router.push("/")
      }

      // If pending 2FA but not on 2FA page
      if (pendingTwoFactorAuth && pathname !== "/two-factor") {
        router.push("/two-factor")
      }
    }, 500)

    return () => clearTimeout(checkAuth)
  }, [user, pathname, router, pendingTwoFactorAuth])

  const login = async (email: string, password: string, rememberMe = false) => {
    // Check if account is locked out
    if (lockoutUntil && new Date() < lockoutUntil) {
      const minutesLeft = Math.ceil((lockoutUntil.getTime() - new Date().getTime()) / 60000)
      return {
        success: false,
        error: `Account temporarily locked. Try again in ${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}.`,
      }
    }

    // In a real app, this would involve authentication
    // For demo, we'll accept any email that contains "@" and password length > 5
    if (!email.includes("@") || password.length < 6) {
      // Increment failed login attempts
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)

      // Lock account after 5 failed attempts
      if (newAttempts >= 5) {
        const lockout = new Date()
        lockout.setMinutes(lockout.getMinutes() + 15) // 15 minute lockout
        setLockoutUntil(lockout)
        return {
          success: false,
          error: "Too many failed attempts. Account locked for 15 minutes.",
        }
      }

      return {
        success: false,
        error: "Invalid email or password. " + (5 - newAttempts) + " attempts remaining.",
      }
    }

    // Reset login attempts on successful login
    setLoginAttempts(0)
    setLockoutUntil(null)

    // Find the current user (in a real app, this would be from the database)
    const currentUser = users.find((u) => u.id === "currentUser")

    if (!currentUser) {
      return { success: false, error: "User not found" }
    }

    // Add security properties for demo
    const enhancedUser: User = {
      ...currentUser,
      twoFactorEnabled: true, // For demo purposes
      lastLogin: new Date().toISOString(),
      activeSessions: [
        {
          id: "session1",
          device: "Current Browser",
          location: "New York, USA",
          lastActive: new Date().toISOString(),
        },
        {
          id: "session2",
          device: "Mobile App",
          location: "San Francisco, USA",
          lastActive: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
      ],
    }

    // Check if 2FA is enabled
    if (enhancedUser.twoFactorEnabled) {
      setPendingUser(enhancedUser)
      setPendingTwoFactorAuth(true)
      return { success: true, requiresTwoFactor: true }
    }

    // Complete login if no 2FA
    setUser(enhancedUser)

    // Store user in localStorage for persistence if rememberMe is true
    if (rememberMe && typeof window !== "undefined") {
      localStorage.setItem("socialapp_user", JSON.stringify(enhancedUser))
    }

    return { success: true }
  }

  const completeLogin = async (code: string) => {
    // In a real app, validate the 2FA code
    if (code.length !== 6 || !/^\d+$/.test(code)) {
      return { success: false, error: "Invalid verification code" }
    }

    // For demo purposes, accept any 6-digit code
    if (pendingUser) {
      setUser(pendingUser)
      setPendingTwoFactorAuth(false)
      setPendingUser(null)

      // Store user in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("socialapp_user", JSON.stringify(pendingUser))
      }

      return { success: true }
    }

    return { success: false, error: "No pending authentication" }
  }

  const logout = (fromAllDevices = false) => {
    setUser(null)
    setPendingTwoFactorAuth(false)
    setPendingUser(null)

    // Clear stored user
    if (typeof window !== "undefined") {
      localStorage.removeItem("socialapp_user")
    }

    router.push("/login")
  }

  const updateUserSecurity = (settings: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...settings }
      setUser(updatedUser)

      // Update in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("socialapp_user", JSON.stringify(updatedUser))
      }
    }
  }

  const terminateSession = (sessionId: string) => {
    if (user && user.activeSessions) {
      const updatedSessions = user.activeSessions.filter((session) => session.id !== sessionId)
      const updatedUser = { ...user, activeSessions: updatedSessions }
      setUser(updatedUser)

      // Update in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("socialapp_user", JSON.stringify(updatedUser))
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        completeLogin,
        isAuthenticated: !!user,
        isLoading,
        updateUserSecurity,
        terminateSession,
      }}
    >
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
