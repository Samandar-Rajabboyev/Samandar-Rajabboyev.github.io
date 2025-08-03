import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'ecommerce-app',
    name: 'E-commerce Mobile App',
    description: 'Full-featured shopping application with payment integration, user authentication, and real-time inventory management.',
    technologies: ['Flutter', 'Firebase', 'Stripe', 'Provider'],
    year: '2024',
    status: 'Live',
    githubUrl: 'https://github.com/alexchen/ecommerce-app',
    liveUrl: 'https://ecommerce-app.example.com',
    imageUrl: '/images/ecommerce-app.png'
  },
  {
    id: 'fitness-tracker',
    name: 'Fitness Tracker',
    description: 'Social fitness tracking app with workout logging, progress charts, and community features for motivation.',
    technologies: ['Flutter', 'SQLite', 'Charts', 'Camera'],
    year: '2024',
    status: 'In Development',
    githubUrl: 'https://github.com/alexchen/fitness-tracker',
    imageUrl: '/images/fitness-tracker.png'
  },
  {
    id: 'task-manager',
    name: 'Team Task Manager',
    description: 'Collaborative project management tool with real-time updates, file sharing, and team communication.',
    technologies: ['Flutter', 'Node.js', 'MongoDB', 'Socket.io'],
    year: '2023',
    status: 'Completed',
    githubUrl: 'https://github.com/alexchen/task-manager',
    liveUrl: 'https://task-manager.example.com',
    imageUrl: '/images/task-manager.png'
  }
] 