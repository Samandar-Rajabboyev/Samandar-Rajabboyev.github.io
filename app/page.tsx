"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeSwitcher } from "./components/theme-switcher"
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { HeroSection } from "@/components/sections/hero-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { BlogSection } from "@/components/sections/blog-section"
import { ContactSection } from "@/components/sections/contact-section"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { projects } from "@/data/projects"
import { blogPosts } from "@/data/blog-posts"
import { skills } from "@/data/skills"
import { contactInfo } from "@/data/contact"

export default function Portfolio() {
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  const { commandHistory: keyboardHistory } = useKeyboardShortcuts({
    onToggleShortcuts: () => setShowShortcuts(!showShortcuts),
    onCloseDialogs: () => {
      setShowShortcuts(false)
    },
    commandHistory,
    setCommandHistory
  })

  // Get latest 3 blog posts for homepage
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <div className="min-h-screen bg-custom-50 dark:bg-custom-900 transition-colors">
      <ScrollProgress />
      <CustomCursor />
      
      {/* Header */}
      <header className="sticky top-0 bg-custom-50/80 dark:bg-custom-900/80 backdrop-blur-sm border-b border-custom-300 dark:border-custom-600 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-semibold text-custom-900 dark:text-custom-50">
                Portfolio
              </h1>
              <div className="hidden md:flex items-center gap-4 text-sm">
                <button
                  onClick={() => setShowShortcuts(true)}
                  className="text-custom-600 hover:text-custom-800 dark:text-custom-400 dark:hover:text-custom-50 transition-colors"
                  title="Keyboard shortcuts (?)"
                >
                  Shortcuts
                </button>
                <ThemeSwitcher />
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              {keyboardHistory.length > 0 && (
                <div className="text-custom-500 dark:text-custom-600 text-xs hidden lg:block">
                  {keyboardHistory[keyboardHistory.length - 1]}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <HeroSection
          name="Samandar Rajabboyev"
          title="Flutter Developer"
          description="Building beautiful, performant cross-platform mobile applications with 4+ years of experience in Flutter and Dart."
          contactEmail={contactInfo.email}
          resumeUrl="/resume.pdf"
        />

        <SkillsSection skills={skills} />

        <ProjectsSection projects={projects} />

        <BlogSection posts={latestPosts} />

        <ContactSection contactInfo={contactInfo} resumeUrl="/resume.pdf" />
      </main>

      {/* Footer */}
      <footer className="border-t border-custom-300 dark:border-custom-600 mt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-custom-600 dark:text-custom-400">
              © 2025 Samandar Rajabboyev. All rights reserved.
            </div>
            <div className="text-sm text-custom-600 dark:text-custom-400">
              Press{" "}
              <kbd className="px-2 py-1 bg-custom-100 dark:bg-custom-800 rounded text-xs font-mono border border-custom-300 dark:border-custom-600 text-custom-900 dark:text-custom-50">
                ?
              </kbd>{" "}
              for shortcuts
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <KeyboardShortcuts 
        isVisible={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </div>
  )
}
