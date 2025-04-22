"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface PostsFilterProps {
  allTags: string[]
  selectedTag?: string
  searchQuery?: string
}

export function PostsFilter({ allTags, selectedTag, searchQuery = "" }: PostsFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState(searchQuery)

  useEffect(() => {
    setSearch(searchQuery || "")
  }, [searchQuery])

  const handleTagClick = (tag: string) => {
    if (tag === selectedTag) {
      // If clicking the already selected tag, remove the filter
      router.push(pathname)
    } else {
      router.push(`${pathname}?tag=${tag}`)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`${pathname}?search=${encodeURIComponent(search)}`)
    } else {
      router.push(pathname)
    }
  }

  const clearSearch = () => {
    setSearch("")
    router.push(pathname)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Search Posts</h3>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8 pr-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>

      <div>
        <h3 className="font-medium mb-3">Filter by Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={tag === selectedTag ? "default" : "outline"}
              size="sm"
              onClick={() => handleTagClick(tag)}
              className="text-xs"
            >
              #{tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
