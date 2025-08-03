"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { Moon, Sun } from "lucide-react"

export function ThemeSwitcher({ onClose }: { onClose?: () => void }) {
  const { theme, toggleTheme } = useTheme()

  const handleToggle = () => {
    toggleTheme()
    if (onClose) {
      onClose()
    }
  }

  // If onClose is provided, we're in modal mode
  if (onClose) {
    return (
              <div className="bg-custom-50 dark:bg-custom-900 rounded-lg shadow-lg border border-custom-300 dark:border-custom-600 p-6 max-w-md w-full mx-4 text-custom-900 dark:text-custom-50">
        <h2 className="text-lg font-semibold mb-4">Choose Theme</h2>
        <div className="space-y-3">
          <button
            onClick={() => {
              if (theme !== "light") toggleTheme()
              onClose()
            }}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
              theme === "light"
                ? "bg-custom-900 text-custom-50 border-custom-900 dark:bg-custom-50 dark:text-custom-900 dark:border-custom-50"
                : "bg-custom-100 text-custom-900 border-custom-300 hover:bg-custom-200 dark:bg-custom-800 dark:text-custom-300 dark:border-custom-600 dark:hover:bg-custom-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5" />
              <span className="font-medium">Light Mode</span>
            </div>
            {theme === "light" && (
              <div className="w-2 h-2 bg-custom-50 dark:bg-custom-900 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => {
              if (theme !== "dark") toggleTheme()
              onClose()
            }}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
              theme === "dark"
                ? "bg-custom-900 text-custom-50 border-custom-900 dark:bg-custom-50 dark:text-custom-900 dark:border-custom-50"
                : "bg-custom-100 text-custom-900 border-custom-300 hover:bg-custom-200 dark:bg-custom-800 dark:text-custom-300 dark:border-custom-600 dark:hover:bg-custom-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5" />
              <span className="font-medium">Dark Mode</span>
            </div>
            {theme === "dark" && (
              <div className="w-2 h-2 bg-custom-50 dark:bg-custom-900 rounded-full"></div>
            )}
          </button>
        </div>
        <div className="mt-6 pt-4 border-t border-custom-300 dark:border-custom-600">
          <button
            onClick={onClose}
            className="w-full bg-custom-900 hover:bg-custom-800 text-custom-50 px-4 py-2 rounded-md dark:bg-custom-50 dark:hover:bg-custom-100 dark:text-custom-900"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  // Default behavior - show toggle button
  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size="sm"
      className="text-custom-600 hover:text-custom-800 dark:text-custom-400 dark:hover:text-custom-50 hover:bg-custom-100 dark:hover:bg-custom-800"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode (t+l/d)`}
    >
      {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      <span className="ml-2 hidden sm:inline">{theme === "light" ? "Dark" : "Light"}</span>
    </Button>
  )
}
