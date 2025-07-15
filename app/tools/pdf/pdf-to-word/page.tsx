"use client";
import Head from "next/head";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PDFToWordPage() {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [downloadUrl, setDownloadUrl] = useState("");
	const [error, setError] = useState("");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e.target.files?.[0] || null);
		setError("");
		setDownloadUrl("");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file) return setError("Please select a PDF file.");
		setLoading(true);
		setError("");
		setDownloadUrl("");
		const formData = new FormData();
		formData.append("file", file);
		try {
			const res = await fetch("http://localhost:5050/api/pdf-to-word", {
				method: "POST",
				body: formData,
			});
			if (!res.ok) throw new Error(await res.text());
			const blob = await res.blob();
			setDownloadUrl(URL.createObjectURL(blob));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Conversion failed.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 py-16 px-4">
			<Head>
				<title>PDF to Word Converter | Convert PDF to DOCX Online</title>
				<meta name="description" content="Convert PDF files to Word (DOCX) instantly online. Fast, secure, and accurate PDF to Word conversion." />
				<meta name="robots" content="index, follow" />
			</Head>
			<div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
				<h1 className="text-3xl font-bold mb-4 text-center">PDF to Word Converter</h1>
				<p className="mb-6 text-center text-gray-600">Convert your PDF files to Word (.docx) format quickly and securely.</p>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input type="file" accept="application/pdf" onChange={handleFileChange} className="block w-full" />
					<Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={loading}>
						{loading ? "Converting..." : "Convert to Word"}
					</Button>
				</form>
				{error && <div className="mt-4 text-red-600 text-center">{error}</div>}
				{downloadUrl && (
					<a href={downloadUrl} download className="mt-6 block text-center py-2 px-4 bg-slate-900 text-white rounded hover:bg-slate-800">
						Download Word File
					</a>
				)}
			</div>
		</main>
	);
}
