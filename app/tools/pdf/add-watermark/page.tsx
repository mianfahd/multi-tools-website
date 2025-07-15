"use client";
import Head from "next/head";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, RotateCcw, CheckCircle, Upload } from "lucide-react";

export default function AddWatermarkPage() {
	const [file, setFile] = useState<File | null>(null);
	const [text, setText] = useState("");
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

	const addWatermark = async () => {
		if (!file) return setError("Please select a PDF file.");
		if (!text.trim()) return setError("Please enter watermark text.");
		setIsConverting(true);
		setProgress(10);
		setError("");
		const formData = new FormData();
		formData.append("file", file);
		formData.append("text", text);
		try {
			const response = await fetch("http://localhost:5050/api/add-watermark", {
				method: "POST",
				body: formData,
			});
			if (!response.ok) throw new Error("Watermarking failed");
			setProgress(80);
			const blob = await response.blob();
			setDownloadUrl(URL.createObjectURL(blob));
			setIsConverting(false);
			setIsComplete(true);
			setProgress(100);
		} catch (err) {
			setIsConverting(false);
			setIsComplete(false);
			setError("Failed to add watermark: " + (err as Error).message);
		}
	};

	const handleReset = () => {
		setFile(null);
		setText("");
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
			link.download = `${file?.name.replace(/\.pdf$/i, "")}-watermarked.pdf`;
			link.click();
		}
	};

	return (
		<>
			<Head>
				<title>Add Watermark to PDF | Multi Tools Website</title>
				<meta name="description" content="Add text watermark to your PDF files online. Fast, secure, and easy PDF watermarking tool." />
				<meta property="og:title" content="Add Watermark to PDF" />
				<meta property="og:description" content="Add text watermark to your PDF files online. Fast, secure, and easy PDF watermarking tool." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://yourdomain.com/tools/pdf/add-watermark" />
				<meta property="og:image" content="https://yourdomain.com/placeholder-logo.png" />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 py-8">
				<div className="container max-w-4xl mx-auto px-4 md:px-6">
					<div className="text-center mb-8">
						<div className="flex items-center justify-center mb-4">
							<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
								<FileText className="w-6 h-6 text-blue-600" />
							</div>
						</div>
						<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Add Watermark to PDF</h1>
						<p className="text-lg text-slate-600 max-w-2xl mx-auto">
							Upload your PDF and add a custom text watermark to every page.
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
										<input type="text" placeholder="Watermark text" value={text} onChange={e => setText(e.target.value)} className="block w-full border rounded px-3 py-2" />
										{isConverting && (
											<div className="space-y-2">
												<div className="flex justify-between text-sm">
													<span>Adding Watermark...</span>
													<span>{progress}%</span>
												</div>
												<div className="w-full h-2 bg-slate-200 rounded">
													<div className="h-2 bg-blue-500 rounded" style={{ width: `${progress}%` }} />
												</div>
											</div>
										)}
										{isComplete && (
											<div className="bg-blue-50 p-4 rounded flex items-center gap-2">
												<CheckCircle className="h-5 w-5 text-blue-600" />
												<span className="text-blue-700">Watermark added! Your PDF is ready for download.</span>
											</div>
										)}
										{error && (
											<div className="bg-red-50 p-4 rounded text-red-700 mb-2">{error}</div>
										)}
										<div className="flex gap-3">
											{!isConverting && !isComplete && (
												<Button onClick={addWatermark} className="flex-1 bg-blue-600 hover:bg-blue-700">
													Add Watermark
												</Button>
											)}
											{isComplete && (
												<Button onClick={handleDownload} className="flex-1 bg-slate-900 hover:bg-slate-800">
													<Download className="w-4 h-4 mr-2" />
													Download Watermarked PDF
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
									<li>Add custom text watermark to every page</li>
									<li>Fast and secure processing</li>
									<li>Download watermarked PDF instantly</li>
									<li>Easy to use interface</li>
								</ul>
							</div>
							<div className="bg-white rounded-lg shadow p-6">
								<h2 className="text-lg font-bold mb-2">How it works</h2>
								<ol className="list-decimal pl-5 space-y-1 text-sm">
									<li>Upload your PDF file</li>
									<li>Enter watermark text</li>
									<li>Click add watermark to process</li>
									<li>Download your watermarked PDF</li>
								</ol>
							</div>
							<div className="bg-white rounded-lg shadow p-6">
								<h2 className="text-lg font-bold mb-2">FAQs & Guides</h2>
								<ul className="list-disc pl-5 space-y-1 text-sm">
									<li>Can I customize the watermark text?</li>
									<li>Is my PDF secure?</li>
									<li>How is the watermark applied?</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
