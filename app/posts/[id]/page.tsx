import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDistanceToNow, format } from "date-fns"
import { getPostById } from "@/lib/api/posts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { PostActions } from "@/components/post-actions"
import { CommentSection } from "@/components/comment-section"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

interface PostPageProps {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/posts" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to posts
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <Link href={`/profile/${post.author._id}`} className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.author.name}</span>
            </Link>

            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={post.createdAt}>{format(new Date(post.createdAt), "MMM d, yyyy")}</time>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/posts?tag=${tag}`}
                className="text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full text-slate-700"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        <div className="prose prose-slate max-w-none mb-8">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <PostActions post={post} />
        </Suspense>

        <div className="mt-12 pt-8 border-t">
          <CommentSection postId={post._id} initialComments={post.comments} />
        </div>
      </article>
    </div>
  )
}
