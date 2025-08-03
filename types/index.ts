export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  year: string
  status: 'Live' | 'In Development' | 'Completed'
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: string
  slug: string
}

export interface Skill {
  name: string
  category: 'Mobile Development' | 'Backend & APIs' | 'Tools & Practices'
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  icon?: string
}

export interface ContactInfo {
  email: string
  github: string
  linkedin: string
  twitter?: string
  website?: string
}

export interface KeyboardShortcut {
  key: string
  description: string
  action: string
  category: 'navigation' | 'theme' | 'scroll' | 'general'
}

export interface Theme {
  name: string
  value: 'light' | 'dark' | 'system'
  icon: string
} 