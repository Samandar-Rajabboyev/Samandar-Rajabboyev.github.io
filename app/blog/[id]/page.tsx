"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts"
import { useRouter } from "next/navigation"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { MarkdownContent } from "@/components/ui/markdown-content"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

interface BlogPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const unwrappedParams = React.use(params)
  const post = blogPosts.find((p) => p.id === Number.parseInt(unwrappedParams.id))
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const router = useRouter()

  if (!post) {
    notFound()
  }

  const currentIndex = blogPosts.findIndex((p) => p.id === post.id)
  const nextPost = blogPosts[currentIndex + 1]
  const prevPost = blogPosts[currentIndex - 1]

  const navigateToPost = (direction: "next" | "prev") => {
    const targetPost = direction === "next" ? nextPost : prevPost
    if (targetPost) {
      window.location.href = `/blog/${targetPost.id}`
      setCommandHistory((prev) => [...prev.slice(-4), `Navigated to ${direction} article`])
    }
  }

  const { commandHistory: keyboardHistory } = useKeyboardShortcuts({
    onNavigateNext: () => navigateToPost("next"),
    onNavigatePrev: () => navigateToPost("prev"),
    onToggleShortcuts: () => setShowShortcuts(!showShortcuts),
    onCloseDialogs: () => setShowShortcuts(false),
    commandHistory,
    setCommandHistory
  })

  return (
    <div className="min-h-screen bg-custom-50 dark:bg-custom-900 transition-colors">
      <ScrollProgress />
      <CustomCursor />

      {/* Header */}
      <header className="sticky top-0 bg-custom-50/80 backdrop-blur-sm border-b border-custom-300 z-40 dark:bg-custom-900/80 dark:border-custom-600">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="text-xl font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              ← Back to Blog
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowShortcuts(true)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                title="Keyboard shortcuts (?)"
              >
                Shortcuts
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Article Header */}
          <header className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight dark:text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200 dark:border-gray-800 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
              <span className="px-2 py-1 text-xs bg-custom-100 text-custom-600 rounded-full capitalize dark:bg-custom-800 dark:text-custom-300 border border-custom-300 dark:border-custom-600">
                {post.category}
              </span>
            </div>
          </header>

          {/* Keyboard Shortcuts Info */}
          <div
            className="mb-8 bg-custom-100 rounded-lg p-4 border border-custom-300 dark:bg-custom-800 dark:border-custom-600"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-custom-50 rounded text-xs font-mono border border-custom-300 dark:bg-custom-800 dark:border-custom-600 text-custom-900 dark:text-custom-50">
                    j/k
                  </kbd>
                  <span className="text-custom-600 dark:text-custom-400">Scroll up/down</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-custom-50 rounded text-xs font-mono border border-custom-300 dark:bg-custom-800 dark:border-custom-600 text-custom-900 dark:text-custom-50">
                    n/p
                  </kbd>
                  <span className="text-custom-600 dark:text-custom-400">Next/previous article</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-custom-50 rounded text-xs font-mono border border-custom-300 dark:bg-custom-800 dark:border-custom-600 text-custom-900 dark:text-custom-50">
                    h
                  </kbd>
                  <span className="text-custom-600 dark:text-custom-400">Go home</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-custom-50 rounded text-xs font-mono border border-custom-300 dark:bg-custom-800 dark:border-custom-600 text-custom-900 dark:text-custom-50">
                    b
                  </kbd>
                  <span className="text-custom-600 dark:text-custom-400">Back to blog</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-custom-50 rounded-lg p-8 border border-custom-300 mb-12 dark:bg-custom-900 dark:border-custom-600">
            <MarkdownContent content={post.content} />
          </div>

          {/* Navigation to Other Posts */}
          {(prevPost || nextPost) && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-custom-900 dark:text-custom-50">
                More Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.id}`}
                    className="p-4 rounded-lg border border-custom-300 hover:shadow-md transition-shadow cursor-pointer group dark:bg-custom-800 dark:border-custom-600 dark:hover:shadow-md"
                  >
                    <h4 className="font-semibold text-custom-900 group-hover:text-custom-700 transition-colors leading-tight dark:text-custom-50 dark:group-hover:text-custom-300">
                      ← {prevPost.title}
                    </h4>
                    <p className="text-sm text-custom-600 dark:text-custom-400 mt-2">
                      Previous Article
                    </p>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.id}`}
                    className="p-4 rounded-lg border border-custom-300 hover:shadow-md transition-shadow cursor-pointer group dark:bg-custom-800 dark:border-custom-600 dark:hover:shadow-md"
                  >
                    <h4 className="font-semibold text-custom-900 group-hover:text-custom-700 transition-colors leading-tight dark:text-custom-50 dark:group-hover:text-custom-300">
                      {nextPost.title} →
                    </h4>
                    <p className="text-sm text-custom-600 dark:text-custom-400 mt-2">
                      Next Article
                    </p>
                  </Link>
                )}
              </div>
            </div>
          )}
        </motion.article>
      </main>

      {/* Footer */}
      <footer className="border-t border-custom-300 mt-20 dark:border-custom-600">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-custom-600 dark:text-custom-400">
              © 2025 Samandar Rajabboyev. All rights reserved.
            </div>
            <div className="text-sm text-custom-600 dark:text-custom-400">
              Press{" "}
              <kbd className="px-2 py-1 bg-custom-100 rounded text-xs font-mono border border-custom-300 dark:bg-custom-800 dark:border-custom-600 text-custom-900 dark:text-custom-50">
                ?
              </kbd>{" "}
              for shortcuts
            </div>
          </div>
        </div>
      </footer>

      <KeyboardShortcuts 
        isVisible={showShortcuts} 
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  )
}
