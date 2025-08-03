import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { BlogPost } from "@/types"

interface BlogPostCardProps {
  post: BlogPost
  index?: number
  variant?: "default" | "compact"
}

export function BlogPostCard({ post, index = 0, variant = "default" }: BlogPostCardProps) {
  const isCompact = variant === "compact"
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
                    className={`group cursor-pointer ${
                isCompact 
                  ? "border-b border-custom-300 dark:border-custom-600 pb-8 last:border-b-0" 
                  : ""
              }`}
    >
      <Link href={`/blog/${post.id}`}>
        <div className={`flex flex-col md:flex-row md:items-start justify-between gap-4 p-4 -m-4 rounded-lg hover:bg-custom-100 dark:hover:bg-custom-800/50 transition-all duration-300 ${
          isCompact ? "" : ""
        }`}>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 text-xs text-custom-600 dark:text-custom-400">
              <motion.span 
                className="px-2 py-1 text-xs bg-custom-100 dark:bg-custom-800 text-custom-600 dark:text-custom-300 rounded-full border border-custom-300 dark:border-custom-600"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {post.category}
              </motion.span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <motion.h3 
              className={`font-semibold text-custom-900 dark:text-custom-50 group-hover:text-custom-700 dark:group-hover:text-custom-300 transition-colors ${
                isCompact ? "text-xl" : "text-xl"
              }`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {post.title}
            </motion.h3>
            <p className="text-custom-600 dark:text-custom-400 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <motion.span
                  key={tag}
                                            whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgb(30 32 34)",
                            color: "rgb(240 245 249)"
                          }}
                  className="px-2 py-1 text-xs bg-custom-100 dark:bg-custom-800 text-custom-600 dark:text-custom-300 rounded-full border border-custom-300 dark:border-custom-600 transition-all duration-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.div
            whileHover={{ x: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-5 h-5 text-custom-500 dark:text-custom-600 group-hover:text-custom-700 dark:group-hover:text-custom-400 transition-colors flex-shrink-0" />
          </motion.div>
        </div>
      </Link>
    </motion.article>
  )
} 