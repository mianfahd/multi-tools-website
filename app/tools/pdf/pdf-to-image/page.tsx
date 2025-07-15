"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Download, RotateCcw, CheckCircle, Upload } from "lucide-react"
import Head from "next/head"

export default function PDFToImagePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setIsComplete(false)
      setImages([])
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setIsComplete(false)
      setImages([])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const convertToImages = async () => {
    if (!file) return
    setIsConverting(true)
    setProgress(10)
    const apiUrl = process.env.NEXT_PUBLIC_PDF_TO_IMAGE_API_URL || "http://localhost:5000/api/pdf-to-image"
    const formData = new FormData()
    formData.append("file", file)
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      })
      if (!response.ok) throw new Error("Conversion failed")
      setProgress(80)
      const data = await response.json()
      setImages(data.images)
      setIsConverting(false)
      setIsComplete(true)
      setProgress(100)
    } catch (err) {
      setIsConverting(false)
      setIsComplete(false)
      alert("Failed to convert PDF: " + (err as Error).message)
    }
  }

  const handleReset = () => {
    setFile(null)
    setIsConverting(false)
    setProgress(0)
    setIsComplete(false)
    setImages([])
  }

  return (
    <>
      <Head>
        <title>PDF to Image Converter | Multi Tools Website</title>
        <meta name="description" content="Convert PDF pages to high-resolution images (JPEG/PNG). Fast, secure, and accurate conversion." />
        <meta property="og:title" content="PDF to Image Converter" />
        <meta property="og:description" content="Convert PDF pages to high-resolution images (JPEG/PNG). Fast, secure, and accurate conversion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/pdf/pdf-to-image" />
        <meta property="og:image" content="https://yourdomain.com/placeholder-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "PDF to Image Converter",
            "description": "Convert PDF pages to high-resolution images (JPEG/PNG). Fast, secure, and accurate conversion.",
            "url": "https://yourdomain.com/tools/pdf/pdf-to-image",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourdomain.com/"},
                {"@type": "ListItem", "position": 2, "name": "PDF Tools", "item": "https://yourdomain.com/tools/pdf/"},
                {"@type": "ListItem", "position": 3, "name": "PDF to Image", "item": "https://yourdomain.com/tools/pdf/pdf-to-image"}
              ]
            }
          }
        `}</script>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 py-8">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">PDF to Image Converter</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Convert PDF pages to high-resolution images (JPEG/PNG). Fast, secure, and accurate conversion.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                {!file ? (
                  <div
                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-slate-700 mb-2">Drop your PDF file here</p>
                    <p className="text-sm text-slate-500 mb-4">or click to browse files</p>
                    <Button variant="outline">Choose File</Button>
                    <input id="file-input" type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{file.name}</p>
                        <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {isConverting && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Converting...</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                    )}
                    {isComplete && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Conversion completed successfully! Your images are ready for download.
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="flex flex-col gap-3">
                      {images.map((img, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <img src={img} alt={`PDF page ${idx + 1}`} className="border rounded w-full max-w-md" />
                          <Button onClick={() => {
                            const link = document.createElement("a")
                            link.href = img
                            link.download = `page-${idx + 1}.png`
                            link.click()
                          }} variant="outline" className="ml-2">Download</Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-4">
                      {!isConverting && !isComplete && (
                        <Button onClick={convertToImages} className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Convert to Images
                        </Button>
                      )}
                      <Button variant="outline" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">Features</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Converts PDF pages to high-resolution images</li>
                  <li>Supports JPEG and PNG formats</li>
                  <li>Fast conversion process</li>
                  <li>Secure file processing</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">How it works</h2>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Upload your PDF file</li>
                  <li>Click convert to start processing</li>
                  <li>Download your images</li>
                </ol>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">FAQs & Guides</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>How to convert PDF to images and keep quality</li>
                  <li>Tips for organizing converted images</li>
                  <li>Best practices for secure PDF to image conversion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
