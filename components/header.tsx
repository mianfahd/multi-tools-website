"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, Wrench, FileText, ImageIcon, Type, Calculator, Search, Palette } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toolCategories = [
    { name: "PDF Tools", href: "/tools/pdf", icon: FileText },
    { name: "Image Tools", href: "/tools/image", icon: ImageIcon },
    { name: "Text Tools", href: "/tools/text", icon: Type },
    { name: "Calculators", href: "/tools/calculators", icon: Calculator },
    { name: "SEO Tools", href: "/tools/seo", icon: Search },
    { name: "Color Tools", href: "/tools/color", icon: Palette },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">ToolsHub</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-slate-700 hover:text-emerald-600">Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {toolCategories.map((category) => (
                    <NavigationMenuLink key={category.name} asChild>
                      <Link
                        href={category.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-50 focus:text-emerald-600"
                      >
                        <div className="flex items-center space-x-2">
                          <category.icon className="w-4 h-4" />
                          <div className="text-sm font-medium leading-none">{category.name}</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <Wrench className="w-5 h-5 text-emerald-600" />
                <span>ToolsHub</span>
              </Link>

              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Tool Categories</div>
                {toolCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex items-center space-x-2 text-slate-700 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Link
                  href="/blog"
                  className="block text-slate-700 hover:text-emerald-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="block text-slate-700 hover:text-emerald-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
