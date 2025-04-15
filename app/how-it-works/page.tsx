import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Wand2, Download } from "lucide-react"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Upload className="h-10 w-10 text-pink-600" />,
      title: "Upload Photo",
      description: "Upload a full-body photograph of yourself or any person",
      details:
        "Our system accepts various image formats including JPEG, PNG, and WebP. For best results, use a well-lit photo with a clear view of the full body against a simple background. The maximum file size is 10MB.",
    },
    {
      icon: <Wand2 className="h-10 w-10 text-pink-600" />,
      title: "AI Processing",
      description: "Our AI analyzes the photo and generates a 3D character model",
      details:
        "Using advanced machine learning algorithms, our AI identifies body proportions, facial features, and clothing details from your photo. It then creates a stylized 3D character that captures your essence while adding a cute, artistic flair.",
    },
    {
      icon: <Download className="h-10 w-10 text-pink-600" />,
      title: "Download & Share",
      description: "Download your 3D character or share it with friends",
      details:
        "Once your 3D character is ready, you can download it in various formats including GLB, OBJ, and FBX for use in different applications. You can also share your creation directly to social media or via a unique link.",
    },
  ]

  return (
    <>
      <ScrollToTop />
      <div className="container px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your photos into cute 3D characters in just three simple steps
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`space-y-4 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="bg-pink-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h2 className="text-3xl font-bold">{step.title}</h2>
                <p className="text-xl text-gray-600">{step.description}</p>
                <p className="text-gray-600">{step.details}</p>
              </div>
              <Card className={`border-2 border-pink-100 shadow-md ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <CardContent className="p-8 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <div className="text-6xl text-pink-600 mb-4">{index + 1}</div>
                    <p className="text-xl font-medium">Step {index + 1}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Your 3D Character?</h2>
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href="/upload">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
