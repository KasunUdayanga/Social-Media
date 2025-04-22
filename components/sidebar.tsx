"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Bookmark, Home, LogOut, Mail, Search, User } from "lucide-react"
import { useAuth } from "@/components/auth-context"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth()

  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Explore" },
    { icon: Bell, label: "Notifications" },
    { icon: Mail, label: "Messages" },
    { icon: Bookmark, label: "Bookmarks" },
    { icon: User, label: "Profile" },
  ]

  return (
    <div className={cn("w-64 p-4 flex flex-col h-screen", className)}>
      <div className="mb-6 px-4">
        <h1 className="text-2xl font-bold text-blue-500">SocialApp</h1>
      </div>

      <nav className="space-y-2 mb-auto">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-full text-gray-800 hover:bg-gray-100 transition-colors",
              item.active && "font-semibold",
            )}
          >
            <item.icon className={cn("h-6 w-6", item.active && "text-blue-500")} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-full w-full mb-4 transition-colors">
        Post
      </button>

      <div className="flex items-center justify-between p-4 hover:bg-gray-100 rounded-full cursor-pointer mt-auto">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt="Your profile" />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{user?.name || "Guest"}</p>
            <p className="text-gray-500 text-xs">@{user?.username || "guest"}</p>
          </div>
        </div>
        <button onClick={logout} className="text-gray-500 hover:text-red-500" title="Logout">
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
