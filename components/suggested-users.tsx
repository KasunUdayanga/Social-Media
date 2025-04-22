"use client"

import { useState } from "react"
import { users } from "@/lib/data"
import { useAuth } from "@/components/auth-context"

export function SuggestedUsers() {
  const { user: currentUser } = useAuth()
  const [followedUsers, setFollowedUsers] = useState<string[]>([])

  // Filter out the current user and get 3 random users
  const suggestedUsers = users.filter((user) => user.id !== currentUser?.id).slice(0, 3)

  const handleFollow = (userId: string) => {
    if (followedUsers.includes(userId)) {
      setFollowedUsers(followedUsers.filter((id) => id !== userId))
    } else {
      setFollowedUsers([...followedUsers, userId])
    }
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
      <h2 className="font-semibold mb-4">Suggested for you</h2>
      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
            </div>
            <button
              onClick={() => handleFollow(user.id)}
              className={`text-xs font-medium ${
                followedUsers.includes(user.id)
                  ? "text-gray-600 hover:text-gray-800"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              {followedUsers.includes(user.id) ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
