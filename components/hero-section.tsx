import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Users, MessageSquare } from "lucide-react"

export function HeroSection() {
  return (
    <div className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">DevConnect</h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                A community platform for developers to share knowledge, connect with peers, and grow together.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/posts/create">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-200">
                  Start Writing
                </Button>
              </Link>
              <Link href="/posts">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore Posts
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="grid gap-4 md:gap-8">
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
                  <Code2 className="h-10 w-10 mb-4 text-blue-400" />
                  <h3 className="font-bold">Share Code</h3>
                  <p className="text-sm text-gray-300">Share your code snippets, projects, and technical insights.</p>
                </div>
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
                  <Users className="h-10 w-10 mb-4 text-green-400" />
                  <h3 className="font-bold">Connect</h3>
                  <p className="text-sm text-gray-300">Connect with like-minded developers and build your network.</p>
                </div>
              </div>
              <div className="grid gap-4 md:gap-8">
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
                  <MessageSquare className="h-10 w-10 mb-4 text-purple-400" />
                  <h3 className="font-bold">Discuss</h3>
                  <p className="text-sm text-gray-300">Engage in meaningful discussions about tech and development.</p>
                </div>
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
                  <div className="font-bold text-xl mb-2">10K+</div>
                  <p className="text-sm text-gray-300">Developers already sharing and learning on our platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
