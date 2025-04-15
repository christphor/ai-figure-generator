import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModelViewer } from "@/components/model-viewer"
import Link from "next/link"
import { Download, Share2, ArrowLeft, Sparkles } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ResultsPage() {
  return (
    <>
      <ScrollToTop />
      <main className="flex min-h-screen flex-col items-center">
        <div className="w-full bg-gradient-to-b from-pink-50 to-white">
          <div className="container px-4 py-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Your <span className="text-pink-600">3D Character</span> is Ready!
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Here's your adorable 3D character model. You can rotate, zoom, and interact with it below.
              </p>
            </div>
          </div>
        </div>

        <section className="w-full py-8 bg-white">
          <div className="container px-4 max-w-5xl mx-auto">
            <Card className="border-2 border-pink-100 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[500px] w-full">
                  <ModelViewer />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Download className="mr-2 h-4 w-4" /> Download 3D Model
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" /> Share Your Creation
              </Button>
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Create Another
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What Would You Like to Do Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-pink-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-pink-100 p-3 rounded-full mb-4">
                      <Download className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Download Options</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Download your model in different formats for various uses
                    </p>
                    <Button variant="outline" size="sm">
                      View Options
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-pink-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-pink-100 p-3 rounded-full mb-4">
                      <Sparkles className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Customize</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Customize your character with different outfits and poses
                    </p>
                    <Button variant="outline" size="sm">
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-pink-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-pink-100 p-3 rounded-full mb-4">
                      <Share2 className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Share</h3>
                    <p className="text-gray-600 text-sm mb-4">Share your creation on social media or with friends</p>
                    <Button variant="outline" size="sm">
                      Share Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
