import Link from "next/link"
import { Wrench, Mail, Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
  const toolCategories = [
    { name: "PDF Tools", href: "/tools/pdf" },
    { name: "Image Tools", href: "/tools/image" },
    { name: "Text Tools", href: "/tools/text" },
    { name: "Calculators", href: "/tools/calculators" },
    { name: "SEO Tools", href: "/tools/seo" },
    { name: "Color Tools", href: "/tools/color" },
  ]

  const blogCategories = [
    { name: "SEO Tips", href: "/blog/seo-tips" },
    { name: "Tech Guides", href: "/blog/tech-guides" },
    { name: "Productivity", href: "/blog/productivity" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ToolsHub</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Your one-stop destination for free online tools. Fast, secure, and always available.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tools</h3>
            <ul className="space-y-2">
              {toolCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Blog</h3>
            <ul className="space-y-2">
              {blogCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">© 2024 ToolsHub. All rights reserved. Built with ❤️ for productivity.</p>
        </div>
      </div>
    </footer>
  )
}
