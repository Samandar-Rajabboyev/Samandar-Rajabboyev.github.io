import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Mail, ExternalLink } from 'lucide-react'

interface HeroSectionProps {
  name: string
  title: string
  description: string
  contactEmail: string
  resumeUrl?: string
}

export function HeroSection({ 
  name, 
  title, 
  description, 
  contactEmail, 
  resumeUrl 
}: HeroSectionProps) {
  return (
    <section id="intro" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-900 dark:text-custom-50 leading-tight">
            {name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-custom-700 dark:text-custom-300">
            {title}
          </h2>
          <p className="text-lg text-custom-600 dark:text-custom-400 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-custom-900 hover:bg-custom-800 dark:bg-custom-50 dark:hover:bg-custom-100 text-custom-50 dark:text-custom-900 px-6 py-2 rounded-md">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            <Button
              onClick={() => window.open(resumeUrl, '_blank')}
              className="border border-custom-300 dark:border-custom-600 text-custom-700 dark:text-custom-300 hover:bg-custom-100 dark:hover:bg-custom-800 px-6 py-2 rounded-md bg-transparent"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Resume
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 