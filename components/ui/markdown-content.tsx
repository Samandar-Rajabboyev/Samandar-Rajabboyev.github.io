import { useMemo, useState } from "react"
import { Copy, Check, Code } from "lucide-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { pojoaque, vscDarkPlus, coldarkDark, gruvboxLight, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { lightfair, lioshi, qtcreatorLight, github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useTheme } from "@/app/components/theme-provider"
import { CopyButton } from "@/components/ui/copy-button"
// You can try: vsDark, solarizedlight, dracula, tomorrow, pojoaque, vscDarkPlus etc.

/**
 * MarkdownContent renders markdown-like blog content with custom styling, code blocks, lists, and links.
 * Supports copy-to-clipboard for code blocks and uses your custom color palette.
 */
interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { theme } = useTheme()

  const copyToClipboard = async (text: string, id: string) => {
    try {
      setCopiedCode(id)
      await navigator.clipboard.writeText(text)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error(err)
    }
  }
  

  const processContent = (content: string) => {
    // Store code blocks temporarily to protect them from other processing
    const codeBlocks = new Map()
    let codeBlockCounter = 0

    // Extract and store code blocks
    let processedContent = content.replace(
      /^```(\w+)?\n([\s\S]*?)^```/gm,
      (match, lang, code) => {
        const id = useMemo(() => `code-${codeBlockCounter}`, [codeBlockCounter])
        const cleanCode = code.endsWith('\n') ? code.slice(0, -1) : code
        const placeholder = `__CODE_BLOCK_${codeBlockCounter}__`
        codeBlocks.set(placeholder, `<CODE_BLOCK id="${id}" lang="${lang || 'text'}">${cleanCode}</CODE_BLOCK>`)
        codeBlockCounter++
        return `\n${placeholder}\n`
      }
    )

    // Inline code
    processedContent = processedContent.replace(/`([^`]+)`/g, '<INLINE_CODE>$1</INLINE_CODE>')
    // Bold
    processedContent = processedContent.replace(/\*\*([^*]+)\*\*/g, '<STRONG>$1</STRONG>')
    // Italic
    processedContent = processedContent.replace(/\*([^*]+)\*/g, '<EM>$1</EM>')
    // Links
    processedContent = processedContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<LINK href="$2">$1</LINK>')
    // Headings
    processedContent = processedContent.replace(/^# (.+)$/gm, '<H1>$1</H1>')
    processedContent = processedContent.replace(/^## (.+)$/gm, '<H2>$1</H2>')
    processedContent = processedContent.replace(/^### (.+)$/gm, '<H3>$1</H3>')
    processedContent = processedContent.replace(/^#### (.+)$/gm, '<H4>$1</H4>')
    processedContent = processedContent.replace(/^##### (.+)$/gm, '<H5>$1</H5>')
    processedContent = processedContent.replace(/^###### (.+)$/gm, '<H6>$1</H6>')
    // Process lists line by line for better control
    const lines = processedContent.split('\n')
    const processedLines = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Fix: Only treat as unordered list if not inside a code block or tag
      const unorderedMatch = line.match(/^\s*([-*+])\s+(.+)/)
      if (unorderedMatch) {
        const listItems = []
        while (i < lines.length) {
          const currentLine = lines[i]
          const itemMatch = currentLine.match(/^\s*([-*+])\s+(.+)/)
          if (currentLine.trim() === '') {
            // Skip empty lines within lists
            i++
          } else {
            listItems.push(`<LI>${itemMatch == null ? '' : itemMatch[2]}</LI>`)
            i++
          }
        }
        if (listItems.length > 0) {
          processedLines.push(`<UL>${listItems.join('')}</UL>`)
        }
        continue
      }

      // Fix: Only treat as ordered list if not inside a code block or tag
      const orderedMatch = line.match(/^\s*(\d+)\.\s+(.+)/)
      if (orderedMatch) {
        const listItems = []
        while (i < lines.length) {
          const currentLine = lines[i]
          const itemMatch = currentLine.match(/^\s*(\d+)\.\s+(.+)/)
          if (currentLine.trim() === '') {
            // Skip empty lines within lists
            i++
          } else {
            listItems.push(`<LI>${itemMatch == null ? '' : itemMatch[2]}</LI>`)
            i++
          }
        }
        if (listItems.length > 0) {
          processedLines.push(`<OL>${listItems.join('')}</OL>`)
        }
        continue
      }

      processedLines.push(line)
      i++
    }

    processedContent = processedLines.join('\n')
    // Paragraphs (lines that don't start with special tags or code block placeholders)
    processedContent = processedContent.replace(/^(?!<[A-Z]|__CODE_BLOCK_)(.+)$/gm, '<P>$1</P>')
    processedContent = processedContent.replace(/<P><\/P>/g, '')

    // Restore code blocks
    codeBlocks.forEach((codeBlock, placeholder) => {
      processedContent = processedContent.replace(placeholder, codeBlock)
    })

    return processedContent
  }

  const parseElements = (content: string) => {
    const elements = []
    const regex = /<(CODE_BLOCK[^>]*>[\s\S]*?<\/CODE_BLOCK|[A-Z][A-Z0-9]*[^>]*>[^<]*<\/[A-Z][A-Z0-9]*|[A-Z][A-Z0-9]*>[^<]*<\/[A-Z][A-Z0-9]*)>/g

    let lastIndex = 0
    let match

    while ((match = regex.exec(content)) !== null) {
      // Add any text before this match
      const beforeText = content.slice(lastIndex, match.index).trim()
      if (beforeText) {
        elements.push(`<P>${beforeText}</P>`)
      }

      // Add the matched element
      elements.push(match[0])
      lastIndex = regex.lastIndex
    }

    // Add any remaining text
    const remainingText = content.slice(lastIndex).trim()
    if (remainingText) {
      elements.push(`<P>${remainingText}</P>`)
    }

    return elements.filter(el => el.trim())
  }

  const renderElement = (element: string, index: number) => {
    if (element.includes('<CODE_BLOCK')) {
      const idMatch = element.match(/id="([^"]+)"/)
      const langMatch = element.match(/lang="([^"]+)"/)
      const codeMatch = element.match(/<CODE_BLOCK[^>]*>([\s\S]*?)<\/CODE_BLOCK>/)

      if (idMatch && codeMatch) {
        const id = idMatch[1]
        const lang = langMatch ? langMatch[1] : 'text'
        const code = codeMatch[1]

        return (
          <div key={index} className="my-6">
            <div className="bg-[#E8F0F6] dark:bg-[#1A1A1D] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              <div className="flex items-center justify-between px-4 py-2 bg-[#7A8FA0] dark:bg-[#2D3436] border-b border-gray-300 dark:border-gray-600">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-gray-100 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-100 dark:text-gray-400">
                    {lang}
                  </span>
                </div>
                <CopyButton onCopy={() => copyToClipboard(code, id)} copied={copiedCode == id} />
              </div>

              <SyntaxHighlighter
                language={lang}
                style={theme == "light" ? solarizedlight : coldarkDark}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: 'transparent',
                  backgroundColor: 'transparent',
                  fontSize: '0.875rem',
                  fontFamily:
                    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        )
      }
    }

    if (element.startsWith('<H1>')) {
      const title = element.replace(/<H1>(.*?)<\/H1>/, '$1')
      return (
        <h1 key={index} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
          {title}
        </h1>
      )
    }

    if (element.startsWith('<H2>')) {
      const title = element.replace(/<H2>(.*?)<\/H2>/, '$1')
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-50 mb-4 mt-8 leading-tight border-l-4 border-gray-300 dark:border-gray-600 pl-4">
          {title}
        </h2>
      )
    }

    if (element.startsWith('<H3>')) {
      const title = element.replace(/<H3>(.*?)<\/H3>/, '$1')
      return (
        <h3 key={index} className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-3 mt-6">
          {title}
        </h3>
      )
    }

    if (element.startsWith('<P>')) {
      const text = element.replace(/<P>(.*?)<\/P>/, '$1')
      if (text.trim()) {
        return (
          <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {renderInlineElements(text)}
          </p>
        )
      }
    }

    if (element.startsWith('<UL>')) {
      const items = element.match(/<LI>([\s\S]*?)<\/LI>/g) || []
      return (
        <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
          {items.map((item, itemIndex) => {
            const text = item.replace(/<\/?LI>/g, '')
            return (
              <li key={itemIndex} className="leading-relaxed">
                {renderInlineElements(text)}
              </li>
            )
          })}
        </ul>
      )
    }    

    if (element.startsWith('<OL>')) {
      const items = element.match(/<LI>([\s\S]*?)<\/LI>/g) || []
      return (
        <ol key={index} className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
          {items.map((item, itemIndex) => {
            const text = item.replace(/<\/?LI>/g, '')
            return (
              <li key={itemIndex} className="leading-relaxed">
                {renderInlineElements(text)}
              </li>
            )
          })}
        </ol>
      )
    }    

    return null
  }

  const renderInlineElements = (text: string) => {
    // Inline code
    text = text.replace(/<INLINE_CODE>(.*?)<\/INLINE_CODE>/g, (match, code) => {
      return `<code class="inline-code">${code}</code>`
    })
    // Bold
    text = text.replace(/<STRONG>(.*?)<\/STRONG>/g, (match, content) => {
      return `<strong>${content}</strong>`
    })
    // Italic
    text = text.replace(/<EM>(.*?)<\/EM>/g, (match, content) => {
      return `<em>${content}</em>`
    })
    // Links
    text = text.replace(/<LINK href="([^"]+)">(.*?)<\/LINK>/g, (match, href, content) => {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="content-link">${content}</a>`
    })
    return <span dangerouslySetInnerHTML={{ __html: text }} />
  }

  const processedContent = processContent(content)
  const elements = parseElements(processedContent)

  return (
    <div className="markdown-content">
      <style jsx>{`
        .markdown-content .inline-code {
          background-color: rgb(229, 231, 235);
          color: rgb(17, 24, 39);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
        }
        .dark .markdown-content .inline-code {
          background-color: rgb(75, 85, 99);
          color: rgb(243, 244, 246);
        }
        .markdown-content .content-link {
          color: rgb(59, 130, 246);
          text-decoration: underline;
          transition: all 0.2s;
        }
        .markdown-content .content-link:hover {
          color: rgb(29, 78, 216);
        }
        .dark .markdown-content .content-link {
          color: rgb(96, 165, 250);
        }
        .dark .markdown-content .content-link:hover {
          color: rgb(147, 197, 253);
        }
        .markdown-content strong {
          color: rgb(17, 24, 39);
          font-weight: 600;
        }
        .dark .markdown-content strong {
          color: rgb(243, 244, 246);
        }
        .markdown-content em {
          font-style: italic;
          color: rgb(107, 114, 128);
        }
        .dark .markdown-content em {
          color: rgb(156, 163, 175);
        }
      `}</style>
      {elements.map((element, index) => renderElement(element, index))}
    </div>
  )
}