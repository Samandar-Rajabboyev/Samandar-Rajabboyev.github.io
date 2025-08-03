"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { blogPosts } from "@/data/blog-posts"
import { Search, Filter } from "lucide-react"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { BlogPostCard } from "@/components/ui/blog-post-card"

const categories = [
  { name: "All Articles", count: blogPosts.length, key: "all" },
  { name: "Flutter", count: blogPosts.filter(p => p.category === "Flutter").length, key: "Flutter" },
  { name: "Performance", count: blogPosts.filter(p => p.category === "Performance").length, key: "Performance" },
  { name: "UI/UX", count: blogPosts.filter(p => p.category === "UI/UX").length, key: "UI/UX" },
  { name: "Testing", count: blogPosts.filter(p => p.category === "Testing").length, key: "Testing" },
  { name: "Comparison", count: blogPosts.filter(p => p.category === "Comparison").length, key: "Comparison" }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
                         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/" && !isSearchFocused) {
        e.preventDefault()
        document.getElementById("search-input")?.focus()
      }
      
      // Category shortcuts (1-6)
      if (e.key >= "1" && e.key <= "6" && !isSearchFocused) {
        e.preventDefault()
        const categoryIndex = parseInt(e.key) - 1
        if (categoryIndex < categories.length) {
          setSelectedCategory(categories[categoryIndex].key)
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isSearchFocused])

  // Navigation function for keyboard shortcuts
  const navigateToPost = (direction: "next" | "prev") => {
    if (filteredPosts.length === 0) return
    
    // For now, just navigate to the first/last post
    // In a real implementation, you might want to track the current post
    if (direction === "next") {
      window.location.href = `/blog/${filteredPosts[0].id}`
    } else {
      window.location.href = `/blog/${filteredPosts[filteredPosts.length - 1].id}`
    }
  }

  const { commandHistory: keyboardHistory } = useKeyboardShortcuts({
    onNavigateNext: () => navigateToPost("next"),
    onNavigatePrev: () => navigateToPost("prev"),
    onToggleShortcuts: () => setShowShortcuts(!showShortcuts),
    onCloseDialogs: () => {
      setShowShortcuts(false)
    },
    onRefreshPage: () => {
      window.location.reload()
    },
    commandHistory,
    setCommandHistory
  })

  return (
    <div className="min-h-screen bg-custom-50 dark:bg-custom-900 transition-colors">
      <ScrollProgress />
      <CustomCursor />
      
      {/* Header */}
      <header className="sticky top-0 bg-custom-50/80 dark:bg-custom-900/80 backdrop-blur-sm border-b border-custom-300 dark:border-custom-600 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Development Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Insights, tutorials, and thoughts on Flutter development, mobile architecture, and building great user experiences.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              id="search-input"
              type="text"
              placeholder="Search articles... (press / to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-4 py-3 bg-custom-100 dark:bg-custom-800 border border-custom-300 dark:border-custom-600 rounded-lg text-custom-900 dark:text-custom-50 placeholder-custom-500 dark:placeholder-custom-400 focus:outline-none focus:ring-2 focus:ring-custom-600 focus:border-transparent"
            />
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Filter className="w-4 h-4" />
              <span>Categories (press 1-6 to filter)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.key
                      ? "bg-custom-900 dark:bg-custom-50 text-custom-50 dark:text-custom-900"
                      : "bg-custom-100 dark:bg-custom-800 text-custom-700 dark:text-custom-300 hover:bg-custom-200 dark:hover:bg-custom-700"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {filteredPosts.map((post, index) => (
              <BlogPostCard
                key={post.id}
                post={post}
                index={index}
                variant="compact"
              />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No articles found matching your search criteria.
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
      <KeyboardShortcuts 
        isVisible={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </div>
  )
}

