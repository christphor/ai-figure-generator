import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Examples } from "@/components/examples"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <main className="flex min-h-screen flex-col items-center">
        <div className="w-full bg-gradient-to-b from-pink-50 to-white">
          <div className="container px-4 py-16 md:py-24 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="inline-block bg-pink-100 p-2 px-4 rounded-full text-pink-800 font-medium text-sm mb-2">
                ✨ AI-Powered 3D Figure Generator
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                Transform Photos into
                <span className="text-pink-600"> Cute 3D Characters</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Upload a full-body photograph and our AI will generate an adorable 3D character model that you can
                download, share, and enjoy!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700" asChild>
                  <Link href="/upload" className="flex items-center gap-2">
                    Get Started <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/examples">View Examples</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section id="upload" className="w-full py-16 bg-white">
          <div className="container px-4 max-w-5xl mx-auto">
            <Card className="border-2 border-pink-100 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">Upload Your Photo</CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  We'll transform it into a cute 3D character
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload />
              </CardContent>
            </Card>
          </div>
        </section>

        <HowItWorks />
        <Features />
        <Examples />

        <section className="w-full py-16 bg-pink-50">
          <div className="container px-4 max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Create Your 3D Character?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already transformed their photos into adorable 3D figures!
            </p>
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700" asChild>
              <Link href="/upload" className="flex items-center gap-2">
                Create Your Character <Sparkles size={16} />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
