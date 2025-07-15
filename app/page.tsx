import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  ImageIcon,
  Type,
  Calculator,
  Search,
  Palette,
  Clock,
  Shield,
  Zap,
  Users,
  TrendingUp,
  BookOpen,
} from "lucide-react"

export default function HomePage() {
  const toolCategories = [
    {
      title: "PDF Tools",
      description: "Convert, merge, split and edit PDF files easily",
      icon: FileText,
      color: "bg-emerald-100 text-emerald-700",
      tools: ["PDF to Word", "Merge PDF", "Split PDF", "Compress PDF"],
      href: "/tools/pdf",
    },
    {
      title: "Image Tools",
      description: "Resize, compress, convert and edit images",
      icon: ImageIcon,
      color: "bg-amber-100 text-amber-700",
      tools: ["Image Compressor", "Format Converter", "Image Resizer", "Background Remover"],
      href: "/tools/image",
    },
    {
      title: "Text Tools",
      description: "Format, convert and analyze text content",
      icon: Type,
      color: "bg-rose-100 text-rose-700",
      tools: ["Word Counter", "Text Formatter", "Case Converter", "Lorem Generator"],
      href: "/tools/text",
    },
    {
      title: "Calculators",
      description: "Mathematical and financial calculators",
      icon: Calculator,
      color: "bg-violet-100 text-violet-700",
      tools: ["BMI Calculator", "Loan Calculator", "Age Calculator", "Percentage Calculator"],
      href: "/tools/calculators",
    },
    {
      title: "SEO Tools",
      description: "Optimize your website for search engines",
      icon: Search,
      color: "bg-teal-100 text-teal-700",
      tools: ["Meta Tag Generator", "Keyword Density", "Sitemap Generator", "SEO Analyzer"],
      href: "/tools/seo",
    },
    {
      title: "Color Tools",
      description: "Generate and work with colors and palettes",
      icon: Palette,
      color: "bg-orange-100 text-orange-700",
      tools: ["Color Picker", "Palette Generator", "Gradient Generator", "Color Converter"],
      href: "/tools/color",
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "All tools are optimized for speed and performance",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is processed locally and never stored",
    },
    {
      icon: Users,
      title: "User Friendly",
      description: "Simple interface designed for everyone",
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "Access tools 24/7 from any device",
    },
  ]

  const blogCategories = [
    {
      title: "SEO Tips",
      description: "Latest SEO strategies and best practices",
      posts: 15,
      color: "bg-emerald-50 border-emerald-200",
    },
    {
      title: "Tech Guides",
      description: "Step-by-step technology tutorials",
      posts: 12,
      color: "bg-amber-50 border-amber-200",
    },
    {
      title: "Productivity Hacks",
      description: "Tips to boost your daily productivity",
      posts: 8,
      color: "bg-rose-50 border-rose-200",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">🚀 Free Online Tools</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              All-in-One
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                {" "}
                Digital Toolkit
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Access 50+ powerful online tools for PDF, images, text, calculations, SEO and more. No downloads required
              - everything works in your browser!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Explore Tools
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700">
                Read Blog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Tool Category</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Professional-grade tools organized by category for easy access
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.tools.slice(0, 3).map((tool, toolIndex) => (
                      <Badge key={toolIndex} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                        {tool}
                      </Badge>
                    ))}
                    <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                      +more
                    </Badge>
                  </div>
                  <Link href={category.href}>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">View Tools</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Our Tools?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built with modern technology for the best user experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest from Our Blog</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stay updated with tips, tutorials and industry insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {blogCategories.map((category, index) => (
              <Card key={index} className={`${category.color} border-2 hover:shadow-md transition-shadow`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <BookOpen className="w-8 h-8 text-slate-700" />
                    <Badge variant="secondary" className="bg-white/80">
                      {category.posts} posts
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-slate-900">{category.title}</CardTitle>
                  <CardDescription className="text-slate-700">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/blog">
                    <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-white">
                      Read Articles
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button size="lg" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <TrendingUp className="w-4 h-4 mr-2" />
                View All Blog Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of users who trust our tools for their daily tasks
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
            Start Using Tools Now
          </Button>
        </div>
      </section>
    </div>
  )
}
