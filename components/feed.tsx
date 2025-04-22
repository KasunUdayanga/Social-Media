"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PostCard } from "@/components/post-card"
import { createPost, searchPosts } from "@/lib/actions"
import { useAuth } from "@/components/auth-context"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Post } from "@/lib/data"

interface FeedProps {
  initialPosts: Post[]
}

export function Feed({ initialPosts }: FeedProps) {
  const { user } = useAuth()
  const [newPostContent, setNewPostContent] = useState("")
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPostContent.trim()) return

    // Optimistically update UI
    const optimisticPost: Post = {
      id: "temp-" + Date.now(),
      authorId: user?.id || "currentUser",
      content: newPostContent,
      timestamp: "Just now",
      likes: [],
      comments: [],
    }

    setPosts([optimisticPost, ...posts])
    setNewPostContent("")

    // Submit the form
    const formData = new FormData()
    formData.append("content", newPostContent)

    const result = await createPost(formData)

    if (result.error) {
      // If there was an error, remove the optimistic post
      setPosts(posts)
      alert(result.error)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const results = await searchPosts(searchQuery)
      setPosts(results)
    })
  }

  const clearSearch = async () => {
    setSearchQuery("")
    startTransition(async () => {
      const results = await searchPosts("")
      setPosts(results)
    })
  }

  return (
    <div className="divide-y divide-gray-100">
      <div className="p-4 border-b">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search posts..."
              className="pl-10 pr-16"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 text-xs"
                onClick={clearSearch}
              >
                Clear
              </Button>
            )}
          </div>
        </form>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt="Your profile" />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's happening?"
              className="flex-1 resize-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-3">
            <Button
              type="submit"
              className="rounded-full bg-blue-500 hover:bg-blue-600"
              disabled={!newPostContent.trim() || isPending}
            >
              {isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </div>

      <div>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No posts found. {searchQuery ? "Try a different search term." : "Create the first post!"}</p>
          </div>
        )}
      </div>
    </div>
  )
}
