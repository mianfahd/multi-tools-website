import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, User, TrendingUp, Search, Lightbulb } from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    title: "10 Essential SEO Tools Every Website Owner Should Use in 2024",
    excerpt:
      "Discover the most powerful SEO tools that can help boost your website's search engine rankings and drive more organic traffic.",
    image: "/placeholder.svg?height=400&width=600",
    category: "SEO Tips",
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    href: "/blog/essential-seo-tools-2024",
  }

  const blogPosts = [
    {
      title: "How to Optimize Images for Web Performance",
      excerpt:
        "Learn the best practices for image optimization to improve your website's loading speed and user experience.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Tech Guides",
      author: "Mike Chen",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      href: "/blog/optimize-images-web-performance",
    },
    {
      title: "5 Productivity Hacks for Remote Workers",
      excerpt: "Boost your productivity while working from home with these proven strategies and tools.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Productivity",
      author: "Emma Davis",
      date: "Dec 10, 2024",
      readTime: "5 min read",
      href: "/blog/productivity-hacks-remote-workers",
    },
    {
      title: "Understanding Core Web Vitals and Their Impact on SEO",
      excerpt: "A comprehensive guide to Google's Core Web Vitals and how they affect your search rankings.",
      image: "/placeholder.svg?height=200&width=300",
      category: "SEO Tips",
      author: "David Wilson",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      href: "/blog/core-web-vitals-seo-impact",
    },
    {
      title: "The Ultimate Guide to PDF Optimization",
      excerpt: "Everything you need to know about optimizing PDF files for web and mobile devices.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Tech Guides",
      author: "Lisa Rodriguez",
      date: "Dec 5, 2024",
      readTime: "9 min read",
      href: "/blog/ultimate-pdf-optimization-guide",
    },
    {
      title: "Time Management Tools That Actually Work",
      excerpt: "Discover the most effective time management tools and techniques to maximize your daily productivity.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Productivity",
      author: "Alex Thompson",
      date: "Dec 3, 2024",
      readTime: "6 min read",
      href: "/blog/time-management-tools-that-work",
    },
    {
      title: "Local SEO Strategies for Small Businesses",
      excerpt: "Proven local SEO tactics to help small businesses dominate their local search results.",
      image: "/placeholder.svg?height=200&width=300",
      category: "SEO Tips",
      author: "Rachel Green",
      date: "Dec 1, 2024",
      readTime: "8 min read",
      href: "/blog/local-seo-strategies-small-business",
    },
  ]

  const categories = [
    { name: "SEO Tips", count: 15, icon: Search, color: "bg-emerald-100 text-emerald-700" },
    { name: "Tech Guides", count: 12, icon: BookOpen, color: "bg-amber-100 text-amber-700" },
    { name: "Productivity", count: 8, icon: Lightbulb, color: "bg-rose-100 text-rose-700" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Blog</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest tips, tutorials, and insights on SEO, technology, and productivity.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Post */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-emerald-100 text-emerald-800">Featured</Badge>
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{featuredPost.title}</h2>
                  <p className="text-slate-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Link href={featuredPost.href}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Read Full Article</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.map((post, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <div className="overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{post.excerpt}</CardDescription>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Link href={post.href}>
                      <Button variant="outline" size="sm" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <TrendingUp className="w-4 h-4 mr-2" />
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Browse articles by topic</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/blog/category/${category.name.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                        <category.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-slate-900 group-hover:text-emerald-600">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>Get the latest articles delivered to your inbox</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts.slice(0, 3).map((post, index) => (
                  <Link key={index} href={post.href} className="block group">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{post.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
