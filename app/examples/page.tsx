import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ExamplesPage() {
  const examples = [
    {
      before: "/placeholder.svg?height=400&width=300",
      after: "/placeholder.svg?height=400&width=300",
      title: "Casual Style",
      description: "Everyday casual outfit transformed into a cute 3D character",
    },
    {
      before: "/placeholder.svg?height=400&width=300",
      after: "/placeholder.svg?height=400&width=300",
      title: "Professional Look",
      description: "Business attire transformed with professional styling",
    },
    {
      before: "/placeholder.svg?height=400&width=300",
      after: "/placeholder.svg?height=400&width=300",
      title: "Sports Outfit",
      description: "Athletic wear transformed into an energetic 3D character",
    },
    {
      before: "/placeholder.svg?height=400&width=300",
      after: "/placeholder.svg?height=400&width=300",
      title: "Formal Attire",
      description: "Elegant formal wear transformed into a stylish 3D character",
    },
    {
      before: "/placeholder.svg?height=400&width=300",
      after: "/placeholder.svg?height=400&width=300",
      title: "Costume",
      description: "Costume or cosplay transformed into a themed 3D character",
    },
    {
      before: "/placeholder.svg?height=400&width=300",
      after: "/placeholder.svg?height=400&width=300",
      title: "Vintage Style",
      description: "Retro or vintage outfit transformed with period-appropriate styling",
    },
  ]

  return (
    <>
      <ScrollToTop />
      <div className="container px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Example Transformations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how our AI transforms real photos into cute 3D characters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <Card key={index} className="border-2 border-pink-100 shadow-md overflow-hidden">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold text-center mb-2">{example.title}</h3>
                <p className="text-gray-600 text-center mb-4">{example.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <div className="relative h-60 w-full">
                      <Image
                        src={example.before || "/placeholder.svg"}
                        alt={`Before ${example.title}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-600">Original</p>
                  </div>
                  <div className="space-y-2">
                    <div className="relative h-60 w-full">
                      <Image
                        src={example.after || "/placeholder.svg"}
                        alt={`After ${example.title}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-600">3D Character</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to Create Your Own 3D Character?</h2>
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href="/upload">Try It Now</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
