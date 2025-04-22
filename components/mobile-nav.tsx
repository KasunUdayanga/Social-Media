"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Bookmark, Home, LogOut, Mail, Menu, Search, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-context"

interface MobileNavProps {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = useState(false)
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
    <div className={cn("border-b border-gray-200 sticky top-0 bg-white z-10", className)}>
      <div className="flex items-center justify-between p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h1 className="text-2xl font-bold text-blue-500">SocialApp</h1>
              </div>

              <nav className="flex-1 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    className={cn(
                      "flex items-center gap-4 px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors",
                      item.active && "font-semibold",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className={cn("h-6 w-6", item.active && "text-blue-500")} />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="p-4 border-t">
                <div className="flex items-center justify-between p-2">
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
                  <button
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                    className="text-gray-500 hover:text-red-500"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-bold text-blue-500">SocialApp</h1>

        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt="Your profile" />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex border-t">
        {navItems.slice(0, 4).map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "flex-1 flex justify-center py-3 text-gray-600 hover:bg-gray-50 transition-colors",
              item.active && "text-blue-500 border-t-2 border-blue-500",
            )}
          >
            <item.icon className="h-6 w-6" />
          </a>
        ))}
      </div>
    </div>
  )
}
