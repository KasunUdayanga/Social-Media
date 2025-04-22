"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { getUserPosts } from "@/lib/api/dashboard"
import { PenSquare, Edit, Trash, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      router.push("/login")
      return
    }

    // Fetch user's posts
    const fetchPosts = async () => {
      try {
        const userPosts = await getUserPosts()
        setPosts(userPosts)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchPosts()
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Manage your posts and account</p>
        </div>
        <Link href="/posts/create">
          <Button className="gap-2">
            <PenSquare className="h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{posts.length}</CardTitle>
            <CardDescription>Total Posts</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{posts.reduce((total, post) => total + post.likes.length, 0)}</CardTitle>
            <CardDescription>Total Likes</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{posts.reduce((total, post) => total + post.comments.length, 0)}</CardTitle>
            <CardDescription>Total Comments</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="saved">Saved Posts</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          {isLoading ? (
            <div className="text-center py-8">Loading your posts...</div>
          ) : posts.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Likes</TableHead>
                      <TableHead className="text-center">Comments</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post._id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</TableCell>
                        <TableCell className="text-center">{post.likes.length}</TableCell>
                        <TableCell className="text-center">{post.comments.length}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/posts/${post._id}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </Link>
                            <Link href={`/posts/${post._id}/edit`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your post and remove it
                                    from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't created any posts yet</p>
              <Link href="/posts/create">
                <Button>Create Your First Post</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You don't have any saved posts</p>
            <Link href="/posts">
              <Button variant="outline">Browse Posts</Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You don't have any draft posts</p>
            <Link href="/posts/create">
              <Button>Create New Post</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
