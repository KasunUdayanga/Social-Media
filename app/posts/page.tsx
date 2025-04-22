import { Suspense } from "react"
import { getPosts } from "@/lib/api/posts"
import { PostCard } from "@/components/post-card"
import { PostsFilter } from "@/components/posts-filter"
import { Skeleton } from "@/components/ui/skeleton"

interface PostsPageProps {
  searchParams: {
    tag?: string
    search?: string
  }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { tag, search } = searchParams
  const allPosts = await getPosts()

  // Filter posts based on search params
  const filteredPosts = allPosts.filter((post) => {
    if (tag && !post.tags.includes(tag)) {
      return false
    }

    if (search) {
      const searchLower = search.toLowerCase()
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    return true
  })

  // Get all unique tags from posts
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags)))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 lg:w-72">
          <div className="sticky top-20">
            <PostsFilter allTags={allTags} selectedTag={tag} searchQuery={search} />
          </div>
        </aside>

        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-6">
            {tag ? `Posts tagged with #${tag}` : search ? `Search results for "${search}"` : "All Posts"}
          </h1>

          <Suspense fallback={<PostsLoadingSkeleton />}>
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No posts found</p>
                <p className="text-gray-400">
                  {tag
                    ? "Try selecting a different tag"
                    : search
                      ? "Try a different search term"
                      : "Be the first to create a post!"}
                </p>
              </div>
            )}
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function PostsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <div className="p-4">
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
