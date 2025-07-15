"use client";
import Head from "next/head";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, RotateCcw, CheckCircle, Upload } from "lucide-react";

export default function PDFToExcelPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith(".pdf")) {
      setFile(selectedFile);
      setIsComplete(false);
      setDownloadUrl(null);
      setError("");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".pdf")) {
      setFile(droppedFile);
      setIsComplete(false);
      setDownloadUrl(null);
      setError("");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const convertToExcel = async () => {
    if (!file) return setError("Please select a PDF file.");
    setIsConverting(true);
    setProgress(10);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:5050/api/pdf-to-excel", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Conversion failed");
      setProgress(80);
      const blob = await response.blob();
      setDownloadUrl(URL.createObjectURL(blob));
      setIsConverting(false);
      setIsComplete(true);
      setProgress(100);
    } catch (err) {
      setIsConverting(false);
      setIsComplete(false);
      setError("Failed to convert PDF: " + (err as Error).message);
    }
  };

  const handleReset = () => {
    setFile(null);
    setIsConverting(false);
    setProgress(0);
    setIsComplete(false);
    setDownloadUrl(null);
    setError("");
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${file?.name.replace(/\.pdf$/i, "")}.xlsx`;
      link.click();
    }
  };

  return (
    <>
      <Head>
        <title>PDF to Excel Converter | Multi Tools Website</title>
        <meta name="description" content="Convert PDF files to Excel (XLSX) instantly online. Fast, secure, and accurate PDF to Excel conversion." />
        <meta property="og:title" content="PDF to Excel Converter" />
        <meta property="og:description" content="Convert PDF files to Excel (XLSX) instantly online. Fast, secure, and accurate PDF to Excel conversion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/pdf/pdf-to-excel" />
        <meta property="og:image" content="https://yourdomain.com/placeholder-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 py-8">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">PDF to Excel Converter</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Convert your PDF files to Excel (.xlsx) format quickly and securely.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                {!file ? (
                  <div
                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer"
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
                      <FileText className="w-8 h-8 text-emerald-600" />
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
                        <div className="w-full h-2 bg-slate-200 rounded">
                          <div className="h-2 bg-emerald-500 rounded" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}
                    {isComplete && (
                      <div className="bg-emerald-50 p-4 rounded flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <span className="text-emerald-700">Conversion completed! Your Excel file is ready for download.</span>
                      </div>
                    )}
                    {error && (
                      <div className="bg-red-50 p-4 rounded text-red-700 mb-2">{error}</div>
                    )}
                    <div className="flex gap-3">
                      {!isConverting && !isComplete && (
                        <Button onClick={convertToExcel} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                          Convert to Excel
                        </Button>
                      )}
                      {isComplete && (
                        <Button onClick={handleDownload} className="flex-1 bg-slate-900 hover:bg-slate-800">
                          <Download className="w-4 h-4 mr-2" />
                          Download Excel File
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
                  <li>Accurate PDF to Excel conversion</li>
                  <li>Preserves tables and formatting</li>
                  <li>Fast and secure processing</li>
                  <li>Download as .xlsx file</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">How it works</h2>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Upload your PDF file</li>
                  <li>Click convert to start processing</li>
                  <li>Download your Excel file</li>
                </ol>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-2">FAQs & Guides</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Will my tables and formatting be preserved?</li>
                  <li>Is my data secure?</li>
                  <li>What format will I get?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
