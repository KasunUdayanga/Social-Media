import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare } from "lucide-react"

interface Post {
  _id: string
  title: string
  content: string
  excerpt: string
  author: {
    _id: string
    name: string
    avatar?: string
  }
  createdAt: string
  likes: string[]
  comments: any[]
  tags: string[]
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/profile/${post.author._id}`} className="text-sm font-medium hover:underline">
              {post.author.name}
            </Link>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <Link href={`/posts/${post._id}`}>
          <CardTitle className="text-xl hover:text-blue-600 transition-colors">{post.title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-600 line-clamp-3">{post.excerpt || post.content.substring(0, 150)}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/posts?tag=${tag}`}
              className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-full text-slate-700"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          <span>{post.likes.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>{post.comments.length}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
