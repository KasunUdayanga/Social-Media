"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { addComment } from "@/lib/api/posts"
import { useToast } from "@/components/ui/use-toast"

interface Comment {
  _id: string
  content: string
  author: {
    _id: string
    name: string
    avatar?: string
  }
  createdAt: string
}

interface CommentSectionProps {
  postId: string
  initialComments: Comment[]
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/login")
      return
    }

    if (!newComment.trim()) return

    try {
      setIsSubmitting(true)

      // Optimistic update
      const tempComment = {
        _id: `temp-${Date.now()}`,
        content: newComment,
        author: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        },
        createdAt: new Date().toISOString(),
      }

      setComments([...comments, tempComment])
      setNewComment("")

      // Actual API call
      const updatedPost = await addComment(postId, newComment)

      // Update with server data
      setComments(updatedPost.comments)

      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      })

      // Revert optimistic update
      setComments(initialComments)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Comments ({comments.length})</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2 resize-none"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!newComment.trim() || isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-slate-50 p-4 rounded-lg mb-8 text-center">
          <p className="text-gray-600 mb-2">You need to be logged in to comment</p>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
        </div>
      )}

      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Link href={`/profile/${comment.author._id}`} className="font-medium hover:underline">
                    {comment.author.name}
                  </Link>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No comments yet</p>
          <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  )
}
