"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Download, RotateCcw, CheckCircle, Upload } from "lucide-react"
import Head from "next/head"

export default function RotatePDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pages, setPages] = useState<string>("")
  const [angle, setAngle] = useState<number>(90)
  const [isRotating, setIsRotating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setIsComplete(false)
      setDownloadUrl(null)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setIsComplete(false)
      setDownloadUrl(null)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const rotatePDF = async () => {
    if (!file || !pages || !angle) return alert("Please select a PDF, pages, and angle.")
    setIsRotating(true)
    setProgress(10)
    const apiUrl = process.env.NEXT_PUBLIC_ROTATE_PDF_API_URL || "http://localhost:5000/api/rotate-pdf"
    const formData = new FormData()
    formData.append("file", file)
    formData.append("pages", pages)
    formData.append("angle", angle.toString())
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      })
      if (!response.ok) throw new Error("Rotate failed")
      setProgress(80)
      const blob = await response.blob()
      setDownloadUrl(URL.createObjectURL(blob))
      setIsRotating(false)
      setIsComplete(true)
      setProgress(100)
    } catch (err) {
      setIsRotating(false)
      setIsComplete(false)
      alert("Failed to rotate PDF: " + (err as Error).message)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPages("")
    setAngle(90)
    setIsRotating(false)
    setProgress(0)
    setIsComplete(false)
    setDownloadUrl(null)
  }

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `${file?.name.replace(/\.pdf$/i, "")}-rotated.pdf`
      link.click()
    }
  }

  return (
    <>
      <Head>
        <title>Rotate PDF | Multi Tools Website</title>
        <meta name="description" content="Rotate selected pages of PDF files to any angle. Fast, secure, and accurate PDF rotation." />
        <meta property="og:title" content="Rotate PDF" />
        <meta property="og:description" content="Rotate selected pages of PDF files to any angle. Fast, secure, and accurate PDF rotation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/pdf/rotate-pdf" />
        <meta property="og:image" content="https://yourdomain.com/placeholder-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Rotate PDF",
            "description": "Rotate selected pages of PDF files to any angle. Fast, secure, and accurate PDF rotation.",
            "url": "https://yourdomain.com/tools/pdf/rotate-pdf",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourdomain.com/"},
                {"@type": "ListItem", "position": 2, "name": "PDF Tools", "item": "https://yourdomain.com/tools/pdf/"},
                {"@type": "ListItem", "position": 3, "name": "Rotate PDF", "item": "https://yourdomain.com/tools/pdf/rotate-pdf"}
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
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Rotate PDF</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Rotate selected pages of PDF files to any angle. Fast, secure, and accurate PDF rotation.
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
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Pages (e.g. 1,2,3)</label>
                      <input
                        type="text"
                        value={pages}
                        onChange={e => setPages(e.target.value)}
                        className="w-full border border-slate-300 rounded px-3 py-2"
                        placeholder="Enter page numbers"
                      />
                      <label className="block text-sm font-medium text-slate-700 mt-2">Rotation Angle</label>
                      <select
                        value={angle}
                        onChange={e => setAngle(Number(e.target.value))}
                        className="w-full border border-slate-300 rounded px-3 py-2"
                      >
                        <option value={90}>90°</option>
                        <option value={180}>180°</option>
                        <option value={270}>270°</option>
                      </select>
                    </div>
                    {isRotating && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Rotating...</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                    )}
                    {isComplete && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Rotation completed successfully! Your rotated PDF is ready for download.
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="flex gap-3">
                      {!isRotating && !isComplete && (
                        <Button onClick={rotatePDF} className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Rotate PDF
                        </Button>
                      )}
                      {isComplete && (
                        <Button onClick={handleDownload} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download Rotated PDF
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
                  <li>Rotate selected PDF pages to any angle</li>
                  <li>Fast rotation process</li>
                  <li>Secure file processing</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">How it works</h2>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Upload your PDF file</li>
                  <li>Enter pages and angle</li>
                  <li>Click rotate to start processing</li>
                  <li>Download your rotated PDF</li>
                </ol>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">FAQs & Guides</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>How to rotate PDFs by page</li>
                  <li>Tips for organizing rotated PDF documents</li>
                  <li>Best practices for secure PDF rotation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
