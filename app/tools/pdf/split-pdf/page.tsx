"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Download, RotateCcw, CheckCircle, Upload } from "lucide-react"
import Head from "next/head"

export default function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pageRange, setPageRange] = useState<string>("")
  const [isSplitting, setIsSplitting] = useState(false)
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

  const splitPDF = async () => {
    if (!file || !pageRange) return alert("Please select a PDF and enter page range.")
    setIsSplitting(true)
    setProgress(10)
    const apiUrl = process.env.NEXT_PUBLIC_SPLIT_PDF_API_URL || "http://localhost:5000/api/split-pdf"
    const formData = new FormData()
    formData.append("file", file)
    formData.append("pageRange", pageRange)
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      })
      if (!response.ok) throw new Error("Split failed")
      setProgress(80)
      const blob = await response.blob()
      setDownloadUrl(URL.createObjectURL(blob))
      setIsSplitting(false)
      setIsComplete(true)
      setProgress(100)
    } catch (err) {
      setIsSplitting(false)
      setIsComplete(false)
      alert("Failed to split PDF: " + (err as Error).message)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPageRange("")
    setIsSplitting(false)
    setProgress(0)
    setIsComplete(false)
    setDownloadUrl(null)
  }

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `${file?.name.replace(/\.pdf$/i, "")}-split.pdf`
      link.click()
    }
  }

  return (
    <>
      <Head>
        <title>Split PDF | Multi Tools Website</title>
        <meta name="description" content="Split PDF files by specific pages or ranges. Fast, secure, and accurate PDF splitting." />
        <meta property="og:title" content="Split PDF" />
        <meta property="og:description" content="Split PDF files by specific pages or ranges. Fast, secure, and accurate PDF splitting." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/pdf/split-pdf" />
        <meta property="og:image" content="https://yourdomain.com/placeholder-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Split PDF",
            "description": "Split PDF files by specific pages or ranges. Fast, secure, and accurate PDF splitting.",
            "url": "https://yourdomain.com/tools/pdf/split-pdf",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourdomain.com/"},
                {"@type": "ListItem", "position": 2, "name": "PDF Tools", "item": "https://yourdomain.com/tools/pdf/"},
                {"@type": "ListItem", "position": 3, "name": "Split PDF", "item": "https://yourdomain.com/tools/pdf/split-pdf"}
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
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Split PDF</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Split PDF files by specific pages or ranges. Fast, secure, and accurate PDF splitting.
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
                      <label className="block text-sm font-medium text-slate-700">Page Range (e.g. 1-3,5,7)</label>
                      <input
                        type="text"
                        value={pageRange}
                        onChange={e => setPageRange(e.target.value)}
                        className="w-full border border-slate-300 rounded px-3 py-2"
                        placeholder="Enter page numbers or ranges"
                      />
                    </div>
                    {isSplitting && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Splitting...</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                    )}
                    {isComplete && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Split completed successfully! Your split PDF is ready for download.
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="flex gap-3">
                      {!isSplitting && !isComplete && (
                        <Button onClick={splitPDF} className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Split PDF
                        </Button>
                      )}
                      {isComplete && (
                        <Button onClick={handleDownload} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download Split PDF
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
                  <li>Split PDF by pages or ranges</li>
                  <li>Fast splitting process</li>
                  <li>Secure file processing</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">How it works</h2>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Upload your PDF file</li>
                  <li>Enter page range</li>
                  <li>Click split to start processing</li>
                  <li>Download your split PDF</li>
                </ol>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">FAQs & Guides</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>How to split PDFs by page range</li>
                  <li>Tips for organizing split PDF documents</li>
                  <li>Best practices for secure PDF splitting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
