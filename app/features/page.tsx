import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Download, Share2, Palette, Zap, Lock, Layers, Globe, Gift } from "lucide-react"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function FeaturesPage() {
  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-pink-600" />,
      title: "High-Quality Models",
      description: "Our AI generates detailed and high-quality 3D character models",
      details:
        "Using advanced machine learning techniques, our system creates detailed 3D models with high polygon counts that can be optimized for various platforms and use cases.",
    },
    {
      icon: <Download className="h-10 w-10 text-pink-600" />,
      title: "Easy Downloads",
      description: "Download your 3D models in various formats for different uses",
      details:
        "Export your 3D characters in GLB, OBJ, FBX, and other popular formats compatible with Unity, Blender, Unreal Engine, and other 3D software.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-pink-600" />,
      title: "Share Instantly",
      description: "Share your creations directly to social media platforms",
      details:
        "With one-click sharing, you can post your 3D characters to Instagram, Twitter, Facebook, and other platforms, or generate a unique link to share with friends.",
    },
    {
      icon: <Palette className="h-10 w-10 text-pink-600" />,
      title: "Customization",
      description: "Customize colors, outfits, and poses of your 3D character",
      details:
        "After generation, you can modify your character's appearance with our intuitive editor. Change colors, swap outfits, adjust poses, and more to make it truly unique.",
    },
    {
      icon: <Zap className="h-10 w-10 text-pink-600" />,
      title: "Fast Processing",
      description: "Get your 3D character in seconds with our optimized AI",
      details:
        "Our cloud-based processing system uses GPU acceleration to generate your 3D character in just seconds, no matter how complex the original photo.",
    },
    {
      icon: <Lock className="h-10 w-10 text-pink-600" />,
      title: "Secure & Private",
      description: "Your uploads are secure and we respect your privacy",
      details:
        "All uploads are encrypted and processed securely. We don't store your original photos longer than necessary for processing, and you can delete your data at any time.",
    },
    {
      icon: <Layers className="h-10 w-10 text-pink-600" />,
      title: "Multiple Styles",
      description: "Choose from various artistic styles for your character",
      details:
        "Select from cute chibi, anime, cartoon, realistic, and other artistic styles to match your preferences or project needs.",
    },
    {
      icon: <Globe className="h-10 w-10 text-pink-600" />,
      title: "Cross-Platform",
      description: "Use your 3D characters across different platforms",
      details:
        "Your generated characters are compatible with VRChat, VTuber software, game engines, AR applications, and many other platforms.",
    },
    {
      icon: <Gift className="h-10 w-10 text-pink-600" />,
      title: "Free Tier",
      description: "Try our service with a generous free tier",
      details:
        "Create up to 3 characters per month for free, with affordable subscription plans available for users who need more.",
    },
  ]

  return (
    <>
      <ScrollToTop />
      <div className="container px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Amazing Features</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover what makes our AI figure generator special</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-pink-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-pink-100 p-4 rounded-full mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <p className="text-sm text-gray-500">{feature.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience These Features?</h2>
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href="/upload">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
