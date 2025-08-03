import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface KeyboardShortcut {
  key: string
  description: string
  action: string
  category: string
}

interface KeyboardShortcutsProps {
  isVisible: boolean
  onClose: () => void
}

const defaultShortcuts: KeyboardShortcut[] = [
  // Navigation
  { key: 'h', description: 'home', action: 'Navigate home', category: 'navigation' },
  { key: 'b', description: 'blog', action: 'Open blog', category: 'navigation' },
  { key: 'Backspace', description: 'back', action: 'Navigate back', category: 'navigation' },
  { key: 'n/p', description: 'next/prev', action: 'Navigate articles', category: 'navigation' },
  { key: 'h/l', description: 'prev/next', action: 'Navigate projects', category: 'navigation' },
  
  // Scrolling
  { key: 'j/k', description: 'scroll', action: 'Scroll up/down', category: 'scroll' },
  { key: 'g/G', description: 'top/bottom', action: 'Scroll to top/bottom', category: 'scroll' },
  
  // Utility
  { key: 'r', description: 'refresh', action: 'Refresh page', category: 'utility' },
  { key: 't+l/d', description: 'theme', action: 'Switch theme', category: 'theme' },
  { key: '?', description: 'shortcuts', action: 'Show shortcuts', category: 'general' },
  { key: 'Escape', description: 'close', action: 'Close dialogs', category: 'general' }
]

const categories = [
  { id: 'navigation', name: 'Navigation' },
  { id: 'scroll', name: 'Scrolling' },
  { id: 'utility', name: 'Utility' },
  { id: 'theme', name: 'Theme' },
  { id: 'general', name: 'General' }
]

export function KeyboardShortcuts({ isVisible, onClose }: KeyboardShortcutsProps) {
  const groupedShortcuts = categories.map(category => ({
    ...category,
    shortcuts: defaultShortcuts.filter(shortcut => shortcut.category === category.id)
  }))

  return (
    <AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-custom-50 dark:bg-custom-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden border border-custom-200 dark:border-custom-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-custom-200 dark:border-custom-800">
          <h2 className="text-lg font-semibold text-custom-900 dark:text-custom-50">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-custom-100 dark:hover:bg-custom-800 transition-colors"
          >
            <X className="w-5 h-5 text-custom-600 dark:text-custom-400" />
          </button>
        </div>

        {/* Shortcuts */}
        <div className="p-5 overflow-y-auto max-h-[calc(80vh-100px)] space-y-6">
          {groupedShortcuts.map((category) => (
            <div key={category.id} className="space-y-2">
              <h3 className="text-xs font-semibold text-custom-500 dark:text-custom-400 uppercase tracking-wider">
                {category.name}
              </h3>

              <div className="divide-y divide-custom-200 dark:divide-custom-800 rounded-lg overflow-hidden border border-custom-200 dark:border-custom-800 bg-custom-100/40 dark:bg-custom-800/40 backdrop-blur-sm">
                {category.shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex justify-between items-center px-3 py-2 hover:bg-custom-100/70 dark:hover:bg-custom-800/70 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <kbd className="px-2 py-1 bg-custom-200 dark:bg-custom-700 text-custom-700 dark:text-custom-200 rounded-md text-xs font-mono shadow-sm border border-custom-300 dark:border-custom-600">
                        {shortcut.key}
                      </kbd>
                      <span className="text-custom-700 dark:text-custom-300 text-sm truncate">
                        {shortcut.description}
                      </span>
                    </div>
                    <span className="text-custom-900 dark:text-custom-50 text-sm font-medium truncate ml-3">
                      {shortcut.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

  )
} 