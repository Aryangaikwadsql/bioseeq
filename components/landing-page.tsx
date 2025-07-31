import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DNAHelixBackground } from "@/components/dna-helix-background"
import { ProcessWalkthrough } from "@/components/process-walkthrough"
import { GradCAMComparison } from "@/components/grad-cam-comparison"

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header className="absolute top-0 left-0 right-0 z-10" />

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-center flex-1 py-20 md:py-0 min-h-screen overflow-hidden">
        <DNAHelixBackground />
        <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Bioseeq – AI-Powered Early Cancer Detection from Medical Images
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              Leveraging cutting-edge artificial intelligence to provide rapid and accurate analysis of medical scans,
              aiding in early diagnosis.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              >
                Upload Scan & Get Result
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            {/* Placeholder for 3D animation or more prominent visual */}
          </div>
        </div>
      </section>

      <ProcessWalkthrough />
      <GradCAMComparison />

      {/* Sample Diagnosis Download */}
      <section className="py-20 bg-background text-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-foreground">See a Sample Diagnosis Report</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download a sample PDF report to understand the comprehensive insights our AI provides.
          </p>
          <a href="/sample-diagnosis.pdf" download="Bioseeq_Sample_Diagnosis_Report.pdf">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Download Sample PDF
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
