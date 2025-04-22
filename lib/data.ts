// This file simulates a database with some initial data
// In a real app, you would use a database like Supabase, MongoDB, or Prisma

export interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio?: string
  followers: number
  following: number
}

export interface Comment {
  id: string
  authorId: string
  content: string
  timestamp: string
}

export interface Post {
  id: string
  authorId: string
  content: string
  image?: string
  timestamp: string
  likes: string[] // Array of user IDs who liked the post
  comments: Comment[]
}

// Sample users
export const users: User[] = [
  {
    id: "user1",
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "UX Designer | Coffee enthusiast | Dog lover",
    followers: 1243,
    following: 567,
  },
  {
    id: "user2",
    name: "David Chen",
    username: "dchen",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Photographer | Traveler | Always exploring",
    followers: 2891,
    following: 432,
  },
  {
    id: "user3",
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Tech writer | AI enthusiast | Book lover",
    followers: 876,
    following: 345,
  },
  {
    id: "user4",
    name: "Alex Rodriguez",
    username: "alexr",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Software Engineer | Gamer | Music lover",
    followers: 1567,
    following: 890,
  },
  {
    id: "user5",
    name: "Maria Garcia",
    username: "mgarcia",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Digital marketer | Food enthusiast | Yoga instructor",
    followers: 2134,
    following: 765,
  },
  {
    id: "currentUser",
    name: "Your Name",
    username: "username",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "This is your profile",
    followers: 342,
    following: 267,
  },
]

// Sample posts
export const initialPosts: Post[] = [
  {
    id: "post1",
    authorId: "user1",
    content: "Just finished my latest design project! So excited to share it with everyone soon. #design #uxdesign",
    timestamp: "2h ago",
    likes: ["user2", "user3"],
    comments: [
      {
        id: "comment1",
        authorId: "user2",
        content: "Can't wait to see it!",
        timestamp: "1h ago",
      },
    ],
  },
  {
    id: "post2",
    authorId: "user2",
    content:
      "Beautiful morning hike today! The views were absolutely breathtaking. Nature always has a way of clearing my mind.",
    image: "/placeholder.svg?height=400&width=600",
    timestamp: "4h ago",
    likes: ["user1", "user3", "user4"],
    comments: [
      {
        id: "comment2",
        authorId: "user3",
        content: "Looks amazing! Where is this?",
        timestamp: "3h ago",
      },
      {
        id: "comment3",
        authorId: "user1",
        content: "I need to go there!",
        timestamp: "2h ago",
      },
    ],
  },
  {
    id: "post3",
    authorId: "user3",
    content:
      "Just finished reading this amazing book on artificial intelligence. Highly recommend for anyone interested in the future of technology!",
    timestamp: "6h ago",
    likes: ["user1"],
    comments: [],
  },
  {
    id: "post4",
    authorId: "user4",
    content: "Working on a new project using React and Next.js. The developer experience is amazing! #webdev #reactjs",
    timestamp: "8h ago",
    likes: ["user1", "user2", "user5"],
    comments: [
      {
        id: "comment4",
        authorId: "user5",
        content: "Next.js is my favorite framework too!",
        timestamp: "7h ago",
      },
    ],
  },
  {
    id: "post5",
    authorId: "user5",
    content: "Made this delicious pasta dish for dinner tonight! #foodie #homecooking",
    image: "/placeholder.svg?height=400&width=600",
    timestamp: "10h ago",
    likes: ["user1", "user3", "user4"],
    comments: [
      {
        id: "comment5",
        authorId: "user1",
        content: "That looks delicious! Can you share the recipe?",
        timestamp: "9h ago",
      },
      {
        id: "comment6",
        authorId: "user3",
        content: "I'm getting hungry just looking at this!",
        timestamp: "8h ago",
      },
    ],
  },
]
