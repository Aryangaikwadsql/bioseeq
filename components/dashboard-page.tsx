"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MessageSquare, X, Download } from "lucide-react" 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

type ScanResult = {
  id: string
  timestamp: string
  fileName: string
  prediction: string
  confidence: number
  gradCamUrl: string
  summary: string
}

export function DashboardPage() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)
  const [gradCamUrl, setGradCamUrl] = useState<string | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scanHistory, setScanHistory] = useLocalStorage<ScanResult[]>("bioseeq-scan-history", [])

  const { toast } = useToast()
  const [chatOpen, setChatOpen] = useState(false)

  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0]
        setFile(selectedFile)
        setFileName(selectedFile.name)
        setPrediction(null)
        setConfidence(null)
        setGradCamUrl(null)
        setSummary(null)
        setProgress(0)
        toast({
          title: "File Selected",
          description: `${selectedFile.name} is ready for analysis.`,
        })
      }
    },
    [toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".dcm"],
    },
    multiple: false,
  })

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please drag and drop an image or click to select one.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setProgress(0)
    setPrediction(null)
    setConfidence(null)
    setGradCamUrl(null)
    setSummary(null)

    const formData = new FormData()
    formData.append("file", file)

      try {
        // Simulate upload progress
        let currentProgress = 0
        const interval = setInterval(() => {
          currentProgress += 10
          if (currentProgress <= 90) {
            setProgress(currentProgress)
          } else {
            clearInterval(interval)
          }
        }, 200)

        const response = await fetch("http://localhost:8000/predict/image", {
          method: "POST",
          body: formData,
        })

        clearInterval(interval)
        setProgress(100)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || 'Unknown error'}`)
        }

        const data = await response.json()
        setPrediction(data.prediction)
        setConfidence(data.confidence)
        setGradCamUrl(null) // No Grad-CAM for tabular data
        setSummary(data.summary)

        const newScan: ScanResult = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleString(),
          fileName: fileName!,
          prediction: data.prediction,
          confidence: data.confidence,
          gradCamUrl: "",
          summary: data.summary,
        }
        setScanHistory((prevHistory) => [newScan, ...prevHistory])

        toast({
          title: "Analysis Complete!",
          description: `Prediction: ${data.prediction} with ${data.confidence}% confidence.`,
          variant: data.prediction === "Cancer" ? "destructive" : "default",
        })
      } catch (error) {
        console.error("Upload failed:", error)
        toast({
          title: "Upload Failed",
          description: (error as Error).message || "There was an error processing your scan. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
  }

  const handleDownloadReport = () => {
    if (summary) {
      const blob = new Blob([summary], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Bioseeq_Diagnosis_Report_${new Date().toISOString()}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({
        title: "Report Downloaded",
        description: "Your diagnosis summary has been downloaded.",
      })
    } else {
      toast({
        title: "No Report Available",
        description: "Please perform a scan first to generate a report.",
        variant: "destructive",
      })
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) {
      toast({
        title: "Empty Message",
        description: "Please type something to chat.",
        variant: "destructive",
      })
      return
    }

    const userMessage = chatInput
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setChatInput("")
    setChatLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setChatMessages((prev) => [...prev, { role: "ai", content: data.response }])
      toast({
        title: "Chat Response",
        description: "Received a response from the chatbot.",
      })
    } catch (error) {
      console.error("Chat API failed:", error)
      setChatMessages((prev) => [...prev, { role: "ai", content: "Sorry, I couldn't process that. Please try again." }])
      toast({
        title: "Chat Error",
        description: "Failed to get a response from the chatbot.",
        variant: "destructive",
      })
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Upload Breast Cancer Scan</CardTitle>
              <CardDescription>Drag and drop your medical image (PNG, JPG, JPEG, DICOM) or click to upload.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200",
                  "hover:border-primary hover:bg-muted/50",
                  isDragActive ? "border-primary bg-muted/50" : "border-border",
                )}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-lg text-muted-foreground">Drop the files here ...</p>
                ) : (
                  <p className="text-lg text-muted-foreground">
                    Drag &apos;n&apos; drop an image here, or click to select file
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">Supported formats: JPG, PNG, DICOM</p>
              </div>
              {file && (
                <div className="mt-6 flex flex-col items-center">
                  <h3 className="text-xl font-semibold mb-4">Selected Image:</h3>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Selected scan"
                    width={200}
                    height={200}
                    className="rounded-md border border-border"
                  />
                  <p className="text-lg text-muted-foreground mt-2">{fileName}</p>
                  <Button onClick={handleUpload} disabled={loading} className="mt-6 px-8 py-3 text-lg">
                    {loading ? "Analyzing..." : "Analyze Scan"}
                  </Button>
                  {loading && <Progress value={progress} className="w-full max-w-md mt-4" />}
                </div>
              )}
            </CardContent>
          </Card>

          {prediction && (
            <Card className="bg-card text-card-foreground shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Analysis Result</CardTitle>
                <CardDescription>Detailed insights from the AI model.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Prediction:</h3>
                  <p
                    className={cn("text-2xl font-bold", prediction === "Cancer" ? "text-destructive" : "text-primary")}
                  >
                    {prediction}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Confidence Score:</h3>
                  <p className="text-2xl font-bold">{confidence}%</p>
                </div>
                {gradCamUrl && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Grad-CAM Overlay:</h3>
                    <div className="relative w-full h-64 border border-border rounded-md overflow-hidden bg-muted/20">
                      <Image
                        src={gradCamUrl || "/placeholder.svg"}
                        alt="Grad-CAM Overlay"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Red areas indicate regions the AI focused on for its prediction.
                    </p>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold mb-2">Diagnosis Summary:</h3>
                  <ScrollArea className="h-48 w-full rounded-md border border-border p-4 bg-muted/20">
                    <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>
                  </ScrollArea>
                </div>
                <Button onClick={handleDownloadReport} className="px-8 py-3 text-lg">
                  <Download className="mr-2 h-5 w-5" /> Download Report
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar for Scan History */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Scan History</CardTitle>
              <CardDescription>Your past scan results.</CardDescription>
            </CardHeader>
            <CardContent>
              {scanHistory.length === 0 ? (
                <p className="text-muted-foreground">No scan history yet. Upload a scan to get started!</p>
              ) : (
                <ScrollArea className="h-[calc(100vh-250px)] max-h-[600px] pr-4">
                  <div className="space-y-4">
                    {scanHistory.map((scan) => (
                      <Card
                        key={scan.id}
                        className="bg-muted/20 border-border p-4 flex items-center space-x-4 transition-all duration-200 hover:bg-muted/30"
                      >
                        <div className="w-20 h-20 flex-shrink-0 rounded-md border border-border bg-muted/20 flex items-center justify-center">
                          <p className="text-xs text-center text-muted-foreground">{scan.fileName}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{scan.timestamp}</p>
                          <p
                            className={cn(
                              "text-lg font-semibold",
                              scan.prediction === "Cancer" ? "text-destructive" : "text-primary",
                            )}
                          >
                            {scan.prediction} ({scan.confidence}%)
                          </p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-sm text-primary hover:text-primary-foreground"
                            onClick={() => {
                              setFileName(scan.fileName)
                              setPrediction(scan.prediction)
                              setConfidence(scan.confidence)
                              setGradCamUrl(scan.gradCamUrl)
                              setSummary(scan.summary)
                              setFile(null) // Clear file to indicate it's from history
                              toast({
                                title: "Viewing Scan Details",
                                description: `Displaying details for scan from ${scan.timestamp}.`,
                              })
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setScanHistory(scanHistory.filter((s) => s.id !== scan.id))
                            toast({
                              title: "Scan Removed",
                              description: "Scan successfully removed from history.",
                            })
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove from history</span>
                        </Button>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Chatbot Floating Button */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-8 right-8 rounded-full h-16 w-16 shadow-lg bg-primary hover:bg-primary/90 transition-all duration-200"
            aria-label="Open Chatbot"
          >
            <MessageSquare className="h-8 w-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[500px] flex flex-col bg-card text-card-foreground border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Medical Terminology Chatbot</DialogTitle>
            <CardDescription className="text-muted-foreground">Ask me about medical terms or concepts.</CardDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 border border-border rounded-md bg-muted/10 mb-4">
            {chatMessages.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Hello! How can I help you understand medical terms today?
              </p>
            ) : (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "mb-2 p-2 rounded-lg max-w-[80%]",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-secondary text-secondary-foreground mr-auto",
                  )}
                >
                  {msg.content}
                </div>
              ))
            )}
            {chatLoading && (
              <div className="mb-2 p-2 rounded-lg bg-secondary text-secondary-foreground mr-auto">Typing...</div>
            )}
          </div>
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <Input
              placeholder="Type your question..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={chatLoading}
              className="bg-input text-foreground border-border focus-visible:ring-ring"
            />
            <Button type="submit" disabled={chatLoading} className="bg-primary hover:bg-primary/90">
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
