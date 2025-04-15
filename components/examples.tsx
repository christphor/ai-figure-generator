import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Examples() {
  const examples = [
    {
      before: "/placeholder.svg?height=300&width=200",
      after: "/placeholder.svg?height=300&width=200",
      title: "Casual Style",
    },
    {
      before: "/placeholder.svg?height=300&width=200",
      after: "/placeholder.svg?height=300&width=200",
      title: "Professional Look",
    },
    {
      before: "/placeholder.svg?height=300&width=200",
      after: "/placeholder.svg?height=300&width=200",
      title: "Sports Outfit",
    },
  ]

  return (
    <section id="examples" className="w-full py-16 bg-gray-50">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Example Transformations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how our AI transforms real photos into cute 3D characters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <Card key={index} className="border-2 border-pink-100 shadow-md overflow-hidden">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-center mb-4">{example.title}</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <div className="relative h-48 w-full">
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
                    <div className="relative h-48 w-full">
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

        <div className="mt-8 text-center">
          <Button className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href="/examples">View More Examples</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
