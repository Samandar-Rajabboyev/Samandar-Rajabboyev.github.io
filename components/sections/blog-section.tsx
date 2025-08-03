import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BlogPost } from "@/types"
import { BlogPostCard } from "@/components/ui/blog-post-card"

interface BlogSectionProps {
  posts: BlogPost[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-custom-900 dark:text-custom-50">
              Latest Articles
            </h2>
            <p className="text-custom-600 dark:text-custom-400 mt-2">
              Insights and tutorials from my development journey.
            </p>
          </div>
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-custom-600 dark:text-custom-400 hover:text-custom-900 dark:hover:text-custom-50 hover:bg-custom-100 dark:hover:bg-custom-800 px-4 py-2 rounded-md transition-all duration-200"
            >
              View all articles
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <BlogPostCard 
              key={post.id}
              post={post}
              index={index}
              variant="compact"
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
} 