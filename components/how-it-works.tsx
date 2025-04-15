import { Card, CardContent } from "@/components/ui/card"
import { Upload, Wand2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-10 w-10 text-pink-600" />,
      title: "Upload Photo",
      description: "Upload a full-body photograph of yourself or any person",
    },
    {
      icon: <Wand2 className="h-10 w-10 text-pink-600" />,
      title: "AI Processing",
      description: "Our AI analyzes the photo and generates a 3D character model",
    },
    {
      icon: <Download className="h-10 w-10 text-pink-600" />,
      title: "Download & Share",
      description: "Download your 3D character or share it with friends",
    },
  ]

  return (
    <section id="how-it-works" className="w-full py-16 bg-gray-50">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your photos into cute 3D characters in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 border-pink-100 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-pink-100 p-4 rounded-full mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href="/how-it-works">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
