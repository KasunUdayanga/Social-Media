import { Feed } from "@/components/feed"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { SuggestedUsers } from "@/components/suggested-users"
import { getPosts } from "@/lib/actions"

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar className="hidden md:flex" />
      <MobileNav className="md:hidden" />
      <main className="flex-1 border-x border-gray-200 max-w-2xl mx-auto bg-white min-h-screen">
        <Feed initialPosts={posts} />
      </main>
      <div className="hidden lg:block w-80 p-4">
        <div className="sticky top-4">
          <SuggestedUsers />
          <div className="mt-4 text-xs text-gray-500">
            <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4">
              <a href="#" className="hover:underline">
                About
              </a>
              <a href="#" className="hover:underline">
                Terms
              </a>
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Cookies
              </a>
              <a href="#" className="hover:underline">
                Ads
              </a>
              <a href="#" className="hover:underline">
                Help
              </a>
            </div>
            <p>© 2023 SocialApp, Inc.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
