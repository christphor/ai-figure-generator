import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Download, Share2, Palette, Zap, Lock } from "lucide-react"
import Link from "next/link"

export function Features() {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-pink-600" />,
      title: "High-Quality Models",
      description: "Our AI generates detailed and high-quality 3D character models",
    },
    {
      icon: <Download className="h-8 w-8 text-pink-600" />,
      title: "Easy Downloads",
      description: "Download your 3D models in various formats for different uses",
    },
    {
      icon: <Share2 className="h-8 w-8 text-pink-600" />,
      title: "Share Instantly",
      description: "Share your creations directly to social media platforms",
    },
    {
      icon: <Palette className="h-8 w-8 text-pink-600" />,
      title: "Customization",
      description: "Customize colors, outfits, and poses of your 3D character",
    },
    {
      icon: <Zap className="h-8 w-8 text-pink-600" />,
      title: "Fast Processing",
      description: "Get your 3D character in seconds with our optimized AI",
    },
    {
      icon: <Lock className="h-8 w-8 text-pink-600" />,
      title: "Secure & Private",
      description: "Your uploads are secure and we respect your privacy",
    },
  ]

  return (
    <section id="features" className="w-full py-16 bg-white">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Amazing Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover what makes our AI figure generator special</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-pink-100 p-3 rounded-full mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href="/features">View All Features</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
