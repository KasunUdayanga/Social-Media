import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { getUserProfile } from "@/lib/api/users"
import { Calendar, MapPin, Link2, Github, Twitter } from "lucide-react"

interface ProfilePageProps {
  params: {
    id: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getUserProfile(params.id)

  if (!profile) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-4 gap-4">
              <Avatar className="h-32 w-32 border-4 border-white rounded-full">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback className="text-4xl">{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 mt-4 md:mt-0">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-gray-600">@{profile.username}</p>
              </div>

              <div className="mt-4 md:mt-0">
                <Button>Follow</Button>
              </div>
            </div>

            {profile.bio && <p className="text-gray-700 mb-4">{profile.bio}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}

              {profile.website && (
                <div className="flex items-center gap-1">
                  <Link2 className="h-4 w-4" />
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    {new URL(profile.website).hostname}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {profile.joinedDate}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}

              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="posts">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="posts">Posts ({profile.posts.length})</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-6">
              {profile.posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No posts yet</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="about" className="mt-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">About {profile.name}</h2>

                {profile.bio ? (
                  <p className="text-gray-700 mb-6">{profile.bio}</p>
                ) : (
                  <p className="text-gray-500 mb-6">No bio provided</p>
                )}

                <h3 className="font-medium mb-2">Skills</h3>
                {profile.skills && profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {profile.skills.map((skill) => (
                      <span key={skill} className="bg-slate-100 px-3 py-1 rounded-full text-slate-700 text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mb-6">No skills listed</p>
                )}

                <h3 className="font-medium mb-2">Contact</h3>
                <div className="space-y-2 text-gray-700">
                  {profile.email && (
                    <p>
                      Email:{" "}
                      <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">
                        {profile.email}
                      </a>
                    </p>
                  )}
                  {profile.website && (
                    <p>
                      Website:{" "}
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
