import { Upload, Brain, Microscope, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProcessWalkthrough() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Scan",
      description: "Securely upload your medical image (e.g., X-ray, MRI, CT scan).",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI model processes your scan for anomalies.",
    },
    {
      icon: Microscope,
      title: "Heatmap",
      description: "Visualize areas of concern with an intuitive Grad-CAM heatmap.",
    },
    {
      icon: FileText,
      title: "Diagnosis Report",
      description: "Receive a comprehensive report with prediction and confidence score.",
    },
  ]

  return (
    <section className="py-20 bg-card text-card-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-foreground">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="bg-background border-border text-foreground shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader className="flex flex-col items-center">
                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
