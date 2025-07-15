"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Download, RotateCcw, CheckCircle, Upload } from "lucide-react"
import Head from "next/head"

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isMerging, setIsMerging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    const pdfFiles = selectedFiles.filter(f => f.type === "application/pdf")
    setFiles(pdfFiles)
    setIsComplete(false)
    setDownloadUrl(null)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    const pdfFiles = droppedFiles.filter(f => f.type === "application/pdf")
    setFiles(pdfFiles)
    setIsComplete(false)
    setDownloadUrl(null)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const mergePDFs = async () => {
    if (files.length < 2) return alert("Please select at least two PDF files.")
    setIsMerging(true)
    setProgress(10)
    const apiUrl = process.env.NEXT_PUBLIC_MERGE_PDF_API_URL || "http://localhost:5000/api/merge-pdf"
    const formData = new FormData()
    files.forEach((file, idx) => formData.append("files", file))
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      })
      if (!response.ok) throw new Error("Merge failed")
      setProgress(80)
      const blob = await response.blob()
      setDownloadUrl(URL.createObjectURL(blob))
      setIsMerging(false)
      setIsComplete(true)
      setProgress(100)
    } catch (err) {
      setIsMerging(false)
      setIsComplete(false)
      alert("Failed to merge PDFs: " + (err as Error).message)
    }
  }

  const handleReset = () => {
    setFiles([])
    setIsMerging(false)
    setProgress(0)
    setIsComplete(false)
    setDownloadUrl(null)
  }

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `merged.pdf`
      link.click()
    }
  }

  return (
    <>
      <Head>
        <title>Merge PDF Files | Multi Tools Website</title>
        <meta name="description" content="Merge multiple PDF files into a single document. Fast, secure, and preserves formatting and order." />
        <meta property="og:title" content="Merge PDF Files" />
        <meta property="og:description" content="Merge multiple PDF files into a single document. Fast, secure, and preserves formatting and order." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/pdf/merge-pdf" />
        <meta property="og:image" content="https://yourdomain.com/placeholder-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Merge PDF Files",
            "description": "Merge multiple PDF files into a single document. Fast, secure, and preserves formatting and order.",
            "url": "https://yourdomain.com/tools/pdf/merge-pdf",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourdomain.com/"},
                {"@type": "ListItem", "position": 2, "name": "PDF Tools", "item": "https://yourdomain.com/tools/pdf/"},
                {"@type": "ListItem", "position": 3, "name": "Merge PDF", "item": "https://yourdomain.com/tools/pdf/merge-pdf"}
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
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Merge PDF Files</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Merge multiple PDF files into a single document while preserving formatting and order.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                {files.length === 0 ? (
                  <div
                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-slate-700 mb-2">Drop your PDF files here</p>
                    <p className="text-sm text-slate-500 mb-4">or click to browse files</p>
                    <Button variant="outline">Choose Files</Button>
                    <input id="file-input" type="file" accept=".pdf" multiple onChange={handleFileSelect} className="hidden" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      {files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                          <FileText className="w-6 h-6 text-blue-600" />
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{file.name}</p>
                            <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {isMerging && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Merging...</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                    )}
                    {isComplete && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Merge completed successfully! Your merged PDF is ready for download.
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="flex gap-3">
                      {!isMerging && !isComplete && (
                        <Button onClick={mergePDFs} className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Merge PDFs
                        </Button>
                      )}
                      {isComplete && (
                        <Button onClick={handleDownload} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download Merged PDF
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
                  <li>Preserves original formatting and order</li>
                  <li>Fast merging process</li>
                  <li>Secure file processing</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">How it works</h2>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Upload your PDF files</li>
                  <li>Click merge to start processing</li>
                  <li>Download your merged PDF</li>
                </ol>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">FAQs & Guides</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>How to merge PDFs and keep formatting</li>
                  <li>Tips for organizing merged PDF documents</li>
                  <li>Best practices for secure PDF merging</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
