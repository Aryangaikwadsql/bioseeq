import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card text-muted-foreground py-8 px-4 md:px-8 border-t border-border">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Bioseeq. All rights reserved.</p>
          <p className="text-sm">AI-Powered Early Cancer Detection.</p>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link
            href="https://github.com/Aryangaikwadsql"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/aryan-g-3093862ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
        <div className="text-sm text-center md:text-right">
          <p>Credits: Medical imaging data from various research institutions.</p>
        </div>
      </div>
    </footer>
  )
}
