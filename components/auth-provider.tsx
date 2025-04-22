"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { login as loginApi, register as registerApi, logout as logoutApi } from "@/lib/api/auth"
import { useToast } from "@/components/ui/use-toast"

interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  bio?: string
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

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: (fromAllDevices?: boolean) => Promise<void>
  updateUserSecurity: (settings: Partial<User>) => void
  terminateSession: (sessionId: string) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateUserSecurity: () => {},
  terminateSession: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()

          // Add mock security data for demo purposes
          const enhancedUser: User = {
            ...data.user,
            twoFactorEnabled: true,
            securityQuestions: false,
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

          setUser(enhancedUser)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const data = await loginApi(email, password)

      // Add mock security data for demo purposes
      const enhancedUser: User = {
        ...data.user,
        twoFactorEnabled: true,
        securityQuestions: false,
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

      setUser(enhancedUser)

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.name}!`,
      })
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)
      const data = await registerApi(name, email, password)

      // Add mock security data for demo purposes
      const enhancedUser: User = {
        ...data.user,
        twoFactorEnabled: false,
        securityQuestions: false,
        lastLogin: new Date().toISOString(),
        activeSessions: [
          {
            id: "session1",
            device: "Current Browser",
            location: "New York, USA",
            lastActive: new Date().toISOString(),
          },
        ],
      }

      setUser(enhancedUser)

      toast({
        title: "Registration successful",
        description: `Welcome to DevConnect, ${data.user.name}!`,
      })
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async (fromAllDevices = false) => {
    try {
      await logoutApi()
      setUser(null)
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })
      router.push("/")
    } catch (error) {
      console.error("Error during logout:", error)
      toast({
        title: "Logout failed",
        description: "An error occurred during logout",
        variant: "destructive",
      })
    }
  }

  const updateUserSecurity = (settings: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...settings }
      setUser(updatedUser)

      toast({
        title: "Settings updated",
        description: "Your security settings have been updated",
      })
    }
  }

  const terminateSession = (sessionId: string) => {
    if (user && user.activeSessions) {
      const updatedSessions = user.activeSessions.filter((session) => session.id !== sessionId)
      const updatedUser = { ...user, activeSessions: updatedSessions }
      setUser(updatedUser)

      toast({
        title: "Session terminated",
        description: "The session has been successfully terminated",
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserSecurity,
        terminateSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
