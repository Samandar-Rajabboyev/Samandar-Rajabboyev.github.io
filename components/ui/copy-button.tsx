import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check } from "lucide-react"

export function CopyButton({ onCopy, copied }: { onCopy: () => void; copied: boolean }) {
  return (
    <button
      onClick={onCopy}
      className="relative flex items-center gap-1 text-xs text-gray-100 dark:text-gray-400 hover:text-gray-300 transition-colors px-2 py-1 rounded-md"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1"
          >
            <Check className="w-3 h-3 text-green-400" />
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1"
          >
            <Copy className="w-3 h-3" />
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
