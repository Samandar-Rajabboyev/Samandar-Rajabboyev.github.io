import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { Project } from "@/types"

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'In Development':
        return 'bg-custom-200 text-custom-700 dark:bg-custom-700/30 dark:text-custom-300'
      case 'Completed':
        return 'bg-custom-100 text-custom-700 dark:bg-custom-800 dark:text-custom-300'
      default:
        return 'bg-custom-100 text-custom-700 dark:bg-custom-800 dark:text-custom-300'
    }
  }

  return (
    <section id="projects" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-semibold text-custom-900 dark:text-custom-50">
            Featured Projects
          </h2>
          <p className="text-custom-600 dark:text-custom-400 mt-2">
            A showcase of my recent work in mobile app development and cross-platform solutions.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="border-b border-custom-300 dark:border-custom-600 pb-8 last:border-b-0 group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-4 -m-4 rounded-lg hover:bg-custom-100 dark:hover:bg-custom-800/50 transition-all duration-300">
                <div className="flex-1">
                  <motion.h3 
                    className="font-semibold text-custom-900 dark:text-custom-50 text-xl mb-2 group-hover:text-custom-700 dark:group-hover:text-custom-300 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.name}
                  </motion.h3>
                  <p className="text-custom-600 dark:text-custom-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                                                  whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgb(30 32 34)",
                            color: "rgb(240 245 249)"
                          }}
                        className="px-3 py-1 text-sm bg-custom-100 dark:bg-custom-800 text-custom-600 dark:text-custom-300 rounded-full border border-custom-300 dark:border-custom-600 transition-all duration-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-custom-600 dark:text-custom-400">
                    <span>{project.year}</span>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </motion.span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className="border border-custom-300 dark:border-custom-600 text-custom-700 dark:text-custom-300 hover:bg-custom-100 dark:hover:bg-custom-800 px-4 py-2 rounded-md bg-transparent transition-all duration-200 hover:shadow-md"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </motion.div>
                  )}
                  {project.liveUrl && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className="bg-custom-900 hover:bg-custom-800 dark:bg-custom-50 dark:hover:bg-custom-100 text-custom-50 dark:text-custom-900 px-4 py-2 rounded-md transition-all duration-200 hover:shadow-md"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 