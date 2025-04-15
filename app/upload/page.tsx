import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/file-upload"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function UploadPage() {
  return (
    <>
      <ScrollToTop />
      <div className="container px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Upload Your Photo</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your full-body photograph into a cute 3D character
          </p>
        </div>

        <Card className="border-2 border-pink-100 shadow-lg max-w-3xl mx-auto">
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

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Tips for Best Results</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Use a well-lit photo with a clear view of the full body</li>
            <li>Choose a photo with a simple background for better results</li>
            <li>Make sure the person's face is clearly visible</li>
            <li>Photos with distinctive clothing or poses work best</li>
            <li>Maximum file size is 10MB</li>
            <li>Supported formats: JPEG, PNG, and WebP</li>
          </ul>
        </div>
      </div>
    </>
  )
}
