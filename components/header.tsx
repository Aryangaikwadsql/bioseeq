"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn("flex items-center justify-between p-4", className)}>
      <Link href="/" className="text-2xl font-bold text-primary hover:text-primary-foreground transition-colors">
        Bioseeq
      </Link>
      <nav className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-foreground hover:bg-primary/20 hover:text-primary transition-colors">
            Dashboard
          </Button>
        </Link>
      </nav>
    </header>
  )
}
