import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/app/components/theme-provider"

interface KeyboardShortcutConfig {
  onScrollUp?: () => void
  onScrollDown?: () => void
  onScrollToTop?: () => void
  onScrollToBottom?: () => void
  onNavigateHome?: () => void
  onNavigateBlog?: () => void
  onNavigateBack?: () => void
  onToggleShortcuts?: () => void
  onCloseDialogs?: () => void
  onNavigateNext?: () => void
  onNavigatePrev?: () => void
  onScrollToSection?: (sectionId: string) => void
  onRefreshPage?: () => void
  commandHistory?: string[]
  setCommandHistory?: (history: string[]) => void
}

export function useKeyboardShortcuts({
  onScrollUp,
  onScrollDown,
  onScrollToTop,
  onScrollToBottom,
  onNavigateHome,
  onNavigateBlog,
  onNavigateBack,
  onToggleShortcuts,
  onCloseDialogs,
  onNavigateNext,
  onNavigatePrev,
  onScrollToSection,
  onRefreshPage,
  commandHistory = [],
  setCommandHistory
}: KeyboardShortcutConfig) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const addToHistory = useCallback((command: string) => {
    if (setCommandHistory) {
      setCommandHistory([...commandHistory.slice(-4), command])
    }
  }, [commandHistory, setCommandHistory])

  const smoothScroll = useCallback((direction: 'up' | 'down') => {
    const scrollAmount = window.innerHeight * 0.3
    window.scrollBy({
      top: direction === 'down' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    addToHistory('Scrolled to top')
  }, [addToHistory])

  const scrollToBottom = useCallback(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    addToHistory('Scrolled to bottom')
  }, [addToHistory])

  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      addToHistory(`Navigated to ${sectionId}`)
    }
  }, [addToHistory])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  useEffect(() => {
    const keysPressed = new Set<string>()

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      keysPressed.add(e.key.toLowerCase())

      // Handle t+l for light theme
      if (keysPressed.has('t') && e.key === 'l') {
        e.preventDefault()
        if (theme !== 'light') {
          setTheme('light')
          addToHistory('Switched to light theme')
        }
        return
      }

      // Handle t+d for dark theme
      if (keysPressed.has('t') && e.key === 'd') {
        e.preventDefault()
        if (theme !== 'dark') {
          setTheme('dark')
          addToHistory('Switched to dark theme')
        }
        return
      }

      // Single key shortcuts (only if t is not pressed)
      if (!keysPressed.has('t')) {
        switch (e.key) {
          case 'j':
            e.preventDefault()
            if (onScrollDown) {
              onScrollDown()
            } else {
              smoothScroll('down')
              addToHistory('Scrolled down')
            }
            break
          case 'k':
            e.preventDefault()
            if (onScrollUp) {
              onScrollUp()
            } else {
              smoothScroll('up')
              addToHistory('Scrolled up')
            }
            break
          case 'g':
            e.preventDefault()
            if (onScrollToTop) {
              onScrollToTop()
            } else {
              scrollToTop()
            }
            break
          case 'G':
            e.preventDefault()
            if (onScrollToBottom) {
              onScrollToBottom()
            } else {
              scrollToBottom()
            }
            break
          case 'h':
            e.preventDefault()
            if (onNavigateHome) {
              onNavigateHome()
            } else {
              router.push('/')
              addToHistory('Navigated home')
            }
            break
          case 'b':
            e.preventDefault()
            if (onNavigateBlog) {
              onNavigateBlog()
            } else {
              router.push('/blog')
              addToHistory('Opened blog')
            }
            break
          case 'n':
            e.preventDefault()
            if (onNavigateNext) {
              onNavigateNext()
            }
            break
          case 'p':
            e.preventDefault()
            if (onNavigatePrev) {
              onNavigatePrev()
            } else if (onScrollToSection) {
              onScrollToSection('projects')
            }
            break
          case 'c':
            e.preventDefault()
            if (onScrollToSection) {
              onScrollToSection('contact')
            }
            break
          case 'Backspace':
            e.preventDefault()
            if (onNavigateBack) {
              onNavigateBack()
            } else {
              router.back()
              addToHistory('Navigated back')
            }
            break
          case 's':
            e.preventDefault()
            if (onScrollToSection) {
              onScrollToSection('skills')
            }
            break
          case 'l':
            e.preventDefault()
            if (onNavigateNext) {
              onNavigateNext()
            }
            break
          case 'r':
            e.preventDefault()
            if (onRefreshPage) {
              onRefreshPage()
            } else {
              window.location.reload()
              addToHistory('Refreshed page')
            }
            break
          case '?':
            e.preventDefault()
            if (onToggleShortcuts) {
              onToggleShortcuts()
            }
            addToHistory('Toggled shortcuts')
            break
          case 'Escape':
            e.preventDefault()
            if (onCloseDialogs) {
              onCloseDialogs()
            }
            addToHistory('Closed dialogs')
            break
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.delete(e.key.toLowerCase())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [
    theme,
    toggleTheme,
    smoothScroll,
    scrollToTop,
    scrollToBottom,
    navigateToSection,
    addToHistory,
    router,
    onScrollUp,
    onScrollDown,
    onScrollToTop,
    onScrollToBottom,
    onNavigateHome,
    onNavigateBlog,
    onNavigateBack,
    onToggleShortcuts,
    onCloseDialogs,
    onNavigateNext,
    onNavigatePrev,
    onScrollToSection,
    onRefreshPage,
  ])

  return {
    commandHistory,
    addToHistory
  }
} 