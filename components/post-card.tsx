"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react"
import { toggleLike, addComment } from "@/lib/actions"
import { useAuth } from "@/components/auth-context"
import { users, type Post, type Comment } from "@/lib/data"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(post.likes.includes(user?.id || "currentUser"))
  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Comment[]>(post.comments)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const author = users.find((u) => u.id === post.authorId) || {
    name: "Unknown User",
    username: "unknown",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const handleLike = async () => {
    // Optimistically update UI
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)

    // Call the server action
    const result = await toggleLike(post.id, user?.id || "currentUser")

    if (result.error) {
      // Revert if there was an error
      setIsLiked(isLiked)
      setLikeCount(likeCount)
      console.error(result.error)
    }
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!commentText.trim()) return

    setIsSubmitting(true)

    // Optimistically update UI
    const optimisticComment: Comment = {
      id: "temp-" + Date.now(),
      authorId: user?.id || "currentUser",
      content: commentText,
      timestamp: "Just now",
    }

    setComments([...comments, optimisticComment])
    setCommentText("")

    // Call the server action
    const result = await addComment(post.id, commentText, user?.id || "currentUser")

    if (result.error) {
      // Revert if there was an error
      setComments(comments)
      alert(result.error)
    }

    setIsSubmitting(false)
  }

  return (
    <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{author.name}</span>
            <span className="text-gray-500 text-sm">@{author.username}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{post.timestamp}</span>
          </div>
          <p className="mt-1 text-gray-900">{post.content}</p>

          {post.image && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <img
                src={post.image || "/placeholder.svg"}
                alt="Post attachment"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="flex justify-between mt-3 text-gray-500">
            <button
              className="flex items-center gap-1 hover:text-blue-500"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{comments.length}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500">
              <Repeat2 className="h-4 w-4" />
              <span className="text-xs">{post.shares || 0}</span>
            </button>
            <button
              className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "hover:text-red-500"}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-xs">{likeCount}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <Share className="h-4 w-4" />
            </button>
          </div>

          {showComments && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              {comments.length > 0 ? (
                <div className="space-y-3 mb-3">
                  {comments.map((comment) => {
                    const commentAuthor = users.find((u) => u.id === comment.authorId) || {
                      name: "Unknown User",
                      username: "unknown",
                      avatar: "/placeholder.svg?height=40&width=40",
                    }

                    return (
                      <div key={comment.id} className="flex gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={commentAuthor.avatar || "/placeholder.svg"} alt={commentAuthor.name} />
                          <AvatarFallback>{commentAuthor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-semibold">{commentAuthor.name}</span>
                              <span className="text-gray-500 text-xs">·</span>
                              <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-3">No comments yet. Be the first to comment!</p>
              )}

              <form onSubmit={handleAddComment} className="flex gap-2 items-start">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt="Your profile" />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add a comment..."
                    className="min-h-[60px] text-sm resize-none"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <Button type="submit" size="sm" disabled={!commentText.trim() || isSubmitting}>
                      {isSubmitting ? "Posting..." : "Comment"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
