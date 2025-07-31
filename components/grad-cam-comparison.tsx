import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GradCAMComparison() {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-foreground">Raw Input vs. Grad-CAM Heatmap</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
          Grad-CAM (Gradient-weighted Class Activation Mapping) helps us understand which parts of an image a
          Convolutional Neural Network (CNN) focuses on when making a prediction. It generates a visual heatmap
          highlighting the important regions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-card border-border text-card-foreground shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Original Medical Scan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-64 md:h-80 border border-border rounded-md overflow-hidden bg-muted/20 flex items-center justify-center">
                <Image
                  src="/images/original-medical-scan.png"
                  alt="Original Medical Scan"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-muted-foreground">
                This is a sample medical image, such as an X-ray or MRI, before AI analysis.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border text-card-foreground shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Grad-CAM Heatmap Overlay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-64 md:h-80 border border-border rounded-md overflow-hidden bg-muted/20 flex items-center justify-center">
                <Image
                  src="/images/grad-cam-heatmap.png"
                  alt="Grad-CAM Heatmap Overlay"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-muted-foreground">
                The heatmap highlights regions (e.g., in red/yellow) that were most influential in the AI&apos;s
                decision.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
