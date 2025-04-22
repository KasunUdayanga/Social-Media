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

export async function getPosts(): Promise<Post[]> {
  // This is a mock implementation for the frontend
  // In a real app, this would fetch from your API
  return [
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
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
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
      _id: "2",
      title: "Building RESTful APIs with Express and MongoDB",
      content:
        "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. In this tutorial, we'll build a RESTful API using Express.js and MongoDB.",
      excerpt: "Learn how to build a RESTful API using Express.js and MongoDB with authentication and data validation.",
      author: {
        _id: "user2",
        name: "Michael Chen",
        avatar: "/placeholder.svg",
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
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
    {
      _id: "3",
      title: "CSS Grid vs Flexbox: When to Use Each",
      content:
        "CSS Grid and Flexbox are powerful layout systems that have revolutionized web design. While they share some similarities, they're designed for different use cases. This post explores when to use each layout system for optimal results.",
      excerpt:
        "CSS Grid and Flexbox are powerful layout systems that have revolutionized web design. Learn when to use each for optimal results.",
      author: {
        _id: "user3",
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg",
      },
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      likes: ["user1", "user2", "user4", "user5"],
      comments: [
        {
          _id: "comment4",
          content: "Great comparison! This cleared up a lot of confusion I had.",
          author: {
            _id: "user4",
            name: "David Kim",
          },
          createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      tags: ["css", "frontend", "webdesign"],
    },
    {
      _id: "4",
      title: "Introduction to TypeScript for JavaScript Developers",
      content:
        "TypeScript extends JavaScript by adding types to the language. It's designed for development at scale, with features that help you catch errors early and make your code more robust. This guide will help JavaScript developers get started with TypeScript.",
      excerpt:
        "TypeScript extends JavaScript by adding types to the language. Learn how to get started and improve your code quality.",
      author: {
        _id: "user4",
        name: "David Kim",
        avatar: "/placeholder.svg",
      },
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      likes: ["user2", "user3"],
      comments: [],
      tags: ["typescript", "javascript", "webdev"],
    },
    {
      _id: "5",
      title: "Optimizing React Performance: Tips and Tricks",
      content:
        "React applications can sometimes suffer from performance issues, especially as they grow in complexity. This post covers various techniques to optimize your React applications, from code splitting to memoization and virtualization.",
      excerpt: "Learn practical techniques to optimize your React applications and deliver a better user experience.",
      author: {
        _id: "user5",
        name: "Alex Turner",
        avatar: "/placeholder.svg",
      },
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
      likes: ["user1", "user2", "user3", "user4"],
      comments: [
        {
          _id: "comment5",
          content: "The section on useMemo and useCallback was particularly helpful!",
          author: {
            _id: "user1",
            name: "Sarah Johnson",
          },
          createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      tags: ["react", "performance", "optimization"],
    },
    {
      _id: "6",
      title: "Getting Started with Docker for Web Developers",
      content:
        "Docker has revolutionized how we develop, ship, and run applications. This beginner-friendly guide explains Docker concepts and demonstrates how to containerize a web application step by step.",
      excerpt: "Learn how to use Docker to containerize your web applications and simplify your development workflow.",
      author: {
        _id: "user1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
      },
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
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
  ]
}

export async function getPostById(id: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find((post) => post._id === id) || null
}

export async function createPost(postData: {
  title: string
  content: string
  excerpt?: string
  tags: string[]
}): Promise<Post> {
  // This would be an API call in a real application
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to create post")
  }

  return response.json()
}

export async function updatePost(
  id: string,
  postData: {
    title?: string
    content?: string
    excerpt?: string
    tags?: string[]
  },
): Promise<Post> {
  // This would be an API call in a real application
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update post")
  }

  return response.json()
}

export async function deletePost(id: string): Promise<void> {
  // This would be an API call in a real application
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to delete post")
  }
}

export async function likePost(id: string): Promise<Post> {
  // This would be an API call in a real application
  const response = await fetch(`/api/posts/${id}/like`, {
    method: "POST",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to like post")
  }

  return response.json()
}

export async function unlikePost(id: string): Promise<Post> {
  // This would be an API call in a real application
  const response = await fetch(`/api/posts/${id}/unlike`, {
    method: "POST",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to unlike post")
  }

  return response.json()
}

export async function addComment(id: string, content: string): Promise<Post> {
  // This would be an API call in a real application
  const response = await fetch(`/api/posts/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to add comment")
  }

  return response.json()
}
