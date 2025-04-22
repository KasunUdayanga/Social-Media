"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Share, Flag, Bookmark, Trash, Edit } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { likePost, unlikePost, deletePost } from "@/lib/api/posts"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Post {
  _id: string
  title: string
  content: string
  author: {
    _id: string
    name: string
  }
  likes: string[]
}

interface PostActionsProps {
  post: Post
}

export function PostActions({ post }: PostActionsProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(user ? post.likes.includes(user._id) : false)
  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [isDeleting, setIsDeleting] = useState(false)

  const isAuthor = user && post.author._id === user._id

  const handleLikeToggle = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    try {
      if (isLiked) {
        await unlikePost(post._id)
        setLikeCount((prev) => prev - 1)
      } else {
        await likePost(post._id)
        setLikeCount((prev) => prev + 1)
      }
      setIsLiked(!isLiked)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      })
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Post link copied to clipboard",
    })
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deletePost(post._id)
      toast({
        title: "Post deleted",
        description: "Your post has been successfully deleted",
      })
      router.push("/posts")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className={`gap-1 ${isLiked ? "text-red-500 border-red-200 hover:text-red-600 hover:border-red-300" : ""}`}
          onClick={handleLikeToggle}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500" : ""}`} />
          <span>
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </span>
        </Button>

        <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
          <Share className="h-4 w-4" />
          <span>Share</span>
        </Button>

        {user && (
          <Button variant="outline" size="sm" className="gap-1">
            <Bookmark className="h-4 w-4" />
            <span>Save</span>
          </Button>
        )}
      </div>

      {isAuthor && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={() => router.push(`/posts/${post._id}/edit`)}>
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-red-500 border-red-200 hover:text-red-600 hover:border-red-300"
              >
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your post and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600">
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {!isAuthor && user && (
        <Button variant="outline" size="sm" className="gap-1">
          <Flag className="h-4 w-4" />
          <span>Report</span>
        </Button>
      )}
    </div>
  )
}
