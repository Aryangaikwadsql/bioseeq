"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function Header({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <header className={cn("flex items-center justify-between p-4", className)}>
      <Link href="/" className="text-2xl font-bold text-primary hover:text-primary-foreground transition-colors ml-4">
        Bioseeq
      </Link>
      <nav className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-foreground hover:bg-primary/20 hover:text-primary transition-colors">
            Dashboard
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="text-foreground hover:bg-primary/20 hover:text-primary transition-colors"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </nav>
    </header>
  )
}
