interface LoginResponse {
  user: {
    _id: string
    name: string
    email: string
    avatar?: string
    bio?: string
  }
  token: string
}

interface RegisterResponse {
  user: {
    _id: string
    name: string
    email: string
    avatar?: string
    bio?: string
  }
  token: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Login failed")
  }

  return response.json()
}

export async function register(name: string, email: string, password: string): Promise<RegisterResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Registration failed")
  }

  return response.json()
}

export async function logout(): Promise<void> {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Logout failed")
  }
}
