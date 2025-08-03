import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ContactInfo } from '@/types'
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react'

interface ContactSectionProps {
  contactInfo: ContactInfo
  resumeUrl?: string
}

export function ContactSection({ contactInfo, resumeUrl }: ContactSectionProps) {
  return (
    <section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-semibold text-custom-900 dark:text-custom-50">
            Get In Touch
          </h2>
          <p className="text-custom-600 dark:text-custom-400 mt-2">
            Let's discuss your next project or just say hello!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-custom-900 dark:text-custom-50 mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-custom-600 dark:text-custom-400" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-custom-700 dark:text-custom-300 hover:text-custom-900 dark:hover:text-custom-50 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-custom-600 dark:text-custom-400" />
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-700 dark:text-custom-300 hover:text-custom-900 dark:hover:text-custom-50 transition-colors"
                >
                  GitHub Profile
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-custom-600 dark:text-custom-400" />
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-700 dark:text-custom-300 hover:text-custom-900 dark:hover:text-custom-50 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
              {contactInfo.twitter && (
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-custom-600 dark:text-custom-400" />
                  <a
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-custom-700 dark:text-custom-300 hover:text-custom-900 dark:hover:text-custom-50 transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-custom-900 dark:text-custom-50 mb-4">
              Quick Actions
            </h3>
            <div className="flex gap-2">
              <Button className="bg-custom-900 hover:bg-custom-800 dark:bg-custom-50 dark:hover:bg-custom-100 text-custom-50 dark:text-custom-900 flex-1 px-4 py-2 rounded-md">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button
                onClick={() => window.open(resumeUrl, '_blank')}
                className="border border-custom-300 dark:border-custom-600 text-custom-700 dark:text-custom-300 hover:bg-custom-100 dark:hover:bg-custom-800 flex-1 px-4 py-2 rounded-md bg-transparent"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Resume
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 