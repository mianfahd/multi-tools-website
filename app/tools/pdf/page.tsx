import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const tools = [
	{ name: "PDF to Word", path: "/tools/pdf/pdf-to-word" },
	{ name: "Word to PDF", path: "/tools/pdf/word-to-pdf" },
	{ name: "Merge PDF", path: "/tools/pdf/merge-pdf" },
	{ name: "Compress PDF", path: "/tools/pdf/compress-pdf" },
	{ name: "Split PDF", path: "/tools/pdf/split-pdf" },
	{ name: "PDF to Image", path: "/tools/pdf/pdf-to-image" },
	{ name: "Unlock PDF", path: "/tools/pdf/unlock-pdf" },
	{ name: "Rotate PDF", path: "/tools/pdf/rotate-pdf" },
	{ name: "PDF to Excel", path: "/tools/pdf/pdf-to-excel" },
	{ name: "Add Watermark", path: "/tools/pdf/add-watermark" },
];

export default function PDFToolsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
			<section className="relative py-20 px-4 md:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
						PDF Tools
					</Badge>
					<h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
						Advanced PDF Tools Suite
					</h1>
					<p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
						Convert, merge, split, compress, unlock, rotate, watermark, and more—fast
						and secure PDF processing in your browser.
					</p>
				</div>
			</section>
			<section className="py-12 px-4 md:px-6 lg:px-8">
				<div className="max-w-5xl mx-auto">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{tools.map((tool) => (
							<Card
								key={tool.path}
								className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
							>
								<CardHeader className="pb-4">
									<div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
										<FileText className="w-6 h-6" />
									</div>
									<CardTitle className="text-xl text-slate-900 group-hover:text-emerald-600 transition-colors">
										{tool.name}
									</CardTitle>
									<CardDescription className="text-slate-600">
										{tool.name} tool
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Link href={tool.path}>
										<Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
											Open Tool
										</Button>
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
