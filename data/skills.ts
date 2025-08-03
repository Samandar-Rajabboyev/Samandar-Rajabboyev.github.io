import { Skill } from '@/types'

export const skills: Skill[] = [
  // Mobile Development
  { name: 'Flutter', category: 'Mobile Development', proficiency: 'Expert', icon: 'flutter' },
  { name: 'Dart', category: 'Mobile Development', proficiency: 'Expert', icon: 'dart' },
  { name: 'iOS', category: 'Mobile Development', proficiency: 'Advanced', icon: 'ios' },
  { name: 'Android', category: 'Mobile Development', proficiency: 'Advanced', icon: 'android' },
  { name: 'Cross-platform', category: 'Mobile Development', proficiency: 'Expert', icon: 'mobile' },
  
  // Backend & APIs
  { name: 'Firebase', category: 'Backend & APIs', proficiency: 'Advanced', icon: 'firebase' },
  { name: 'REST APIs', category: 'Backend & APIs', proficiency: 'Advanced', icon: 'api' },
  { name: 'Node.js', category: 'Backend & APIs', proficiency: 'Intermediate', icon: 'nodejs' },
  { name: 'MongoDB', category: 'Backend & APIs', proficiency: 'Intermediate', icon: 'mongodb' },
  { name: 'SQLite', category: 'Backend & APIs', proficiency: 'Advanced', icon: 'sqlite' },
  
  // Tools & Practices
  { name: 'Git', category: 'Tools & Practices', proficiency: 'Advanced', icon: 'git' },
  { name: 'Testing', category: 'Tools & Practices', proficiency: 'Advanced', icon: 'test' },
  { name: 'CI/CD', category: 'Tools & Practices', proficiency: 'Intermediate', icon: 'cicd' },
  { name: 'State Management', category: 'Tools & Practices', proficiency: 'Expert', icon: 'state' },
  { name: 'UI/UX', category: 'Tools & Practices', proficiency: 'Advanced', icon: 'design' }
]

export const skillCategories = [
  'Mobile Development',
  'Backend & APIs', 
  'Tools & Practices'
] as const 