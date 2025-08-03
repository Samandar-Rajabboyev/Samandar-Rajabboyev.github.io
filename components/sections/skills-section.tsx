import { motion } from 'framer-motion'

interface SkillsSectionProps {
  skills: any[]
  skillCategories?: string[]
}

export function SkillsSection({ skills, skillCategories }: SkillsSectionProps) {
  return (
    <section id="skills" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-semibold text-custom-900 dark:text-custom-50">
            Skills & Technologies
          </h2>
          <p className="text-custom-600 dark:text-custom-400 mt-2">
            With 4+ years of experience in Flutter and mobile development, I specialize in building cross-platform applications using modern development practices. My expertise includes state management, testing, CI/CD, and integrating with various backend services including Firebase and REST APIs.
          </p>
        </div>
      </motion.div>
    </section>
  )
} 