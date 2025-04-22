interface User {
  _id: string
  name: string
  username: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  github?: string
  twitter?: string
  joinedDate: string
  skills?: string[]
  posts: any[]
}

export async function getUserProfile(userId: string): Promise<User | null> {
  // This is a mock implementation for the frontend
  // In a real app, this would fetch from your API

  // Mock data for demonstration
  const mockUsers: Record<string, User> = {
    user1: {
      _id: "user1",
      name: "Sarah Johnson",
      username: "sarahj",
      email: "sarah@example.com",
      avatar: "/placeholder.svg",
      bio: "Senior Frontend Developer passionate about React and modern web technologies. I love creating intuitive user interfaces and sharing my knowledge with the community.",
      location: "San Francisco, CA",
      website: "https://sarahjohnson.dev",
      github: "https://github.com/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      joinedDate: "January 2022",
      skills: ["React", "TypeScript", "CSS", "Next.js", "GraphQL"],
      posts: [
        {
          _id: "1",
          title: "Getting Started with React Hooks",
          content:
            "React Hooks are a powerful feature that allows you to use state and other React features without writing a class. In this post, we'll explore the basics of useState and useEffect hooks and how they can simplify your React components.",
          excerpt:
            "React Hooks are a powerful feature that allows you to use state and other React features without writing a class.",
          author: {
            _id: "user1",
            name: "Sarah Johnson",
            avatar: "/placeholder.svg",
          },
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          likes: ["user2", "user3", "user4"],
          comments: [
            {
              _id: "comment1",
              content: "Great introduction to hooks!",
              author: {
                _id: "user2",
                name: "Michael Chen",
              },
              createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
          tags: ["react", "javascript", "hooks"],
        },
        {
          _id: "6",
          title: "Getting Started with Docker for Web Developers",
          content:
            "Docker has revolutionized how we develop, ship, and run applications. This beginner-friendly guide explains Docker concepts and demonstrates how to containerize a web application step by step.",
          excerpt:
            "Learn how to use Docker to containerize your web applications and simplify your development workflow.",
          author: {
            _id: "user1",
            name: "Sarah Johnson",
            avatar: "/placeholder.svg",
          },
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          likes: ["user3", "user5"],
          comments: [
            {
              _id: "comment6",
              content: "This made Docker so much more approachable. Thanks!",
              author: {
                _id: "user5",
                name: "Alex Turner",
              },
              createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
          tags: ["docker", "devops", "webdev"],
        },
      ],
    },
    user2: {
      _id: "user2",
      name: "Michael Chen",
      username: "mchen",
      email: "michael@example.com",
      avatar: "/placeholder.svg",
      bio: "Backend developer specializing in Node.js and MongoDB. I enjoy building scalable APIs and microservices.",
      location: "Seattle, WA",
      website: "https://michaelchen.dev",
      github: "https://github.com/michaelchen",
      twitter: "https://twitter.com/michaelchen",
      joinedDate: "March 2022",
      skills: ["Node.js", "Express", "MongoDB", "Docker", "AWS"],
      posts: [
        {
          _id: "2",
          title: "Building RESTful APIs with Express and MongoDB",
          content:
            "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. In this tutorial, we'll build a RESTful API using Express.js and MongoDB.",
          excerpt:
            "Learn how to build a RESTful API using Express.js and MongoDB with authentication and data validation.",
          author: {
            _id: "user2",
            name: "Michael Chen",
            avatar: "/placeholder.svg",
          },
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          likes: ["user1", "user5"],
          comments: [
            {
              _id: "comment2",
              content: "This was exactly what I needed! Thanks for the detailed explanation.",
              author: {
                _id: "user3",
                name: "Emily Rodriguez",
              },
              createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
              _id: "comment3",
              content: "Have you considered covering authentication in a follow-up post?",
              author: {
                _id: "user1",
                name: "Sarah Johnson",
              },
              createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
          tags: ["nodejs", "express", "mongodb", "backend"],
        },
      ],
    },
    currentUser: {
      _id: "currentUser",
      name: "Your Name",
      username: "yourname",
      email: "you@example.com",
      avatar: "/placeholder.svg",
      bio: "Full-stack developer passionate about web technologies and open source.",
      location: "New York, NY",
      website: "https://yourwebsite.com",
      github: "https://github.com/yourusername",
      twitter: "https://twitter.com/yourusername",
      joinedDate: "April 2023",
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "Next.js"],
      posts: [],
    },
  }

  // Return the user profile if it exists
  return mockUsers[userId] || null
}
