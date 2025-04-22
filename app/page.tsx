import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { getPosts } from "@/lib/api/posts"
import { HeroSection } from "@/components/hero-section"

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <div className="my-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <Link href="/posts">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-8 my-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Join Our Developer Community</h2>
          <p className="text-gray-600 mb-6">
            Connect with fellow developers, share your knowledge, and stay updated with the latest in tech.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
