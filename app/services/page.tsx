import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="text-xl text-muted-foreground">Explore the services we offer to our clients.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Web Development</h2>
          <p>Custom websites and web applications built with modern technologies.</p>
          <Button variant="outline" asChild>
            <Link href="/portfolio">View Examples</Link>
          </Button>
        </div>

        <div className="rounded-lg border p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Mobile Apps</h2>
          <p>Native and cross-platform mobile applications for iOS and Android.</p>
          <Button variant="outline" asChild>
            <Link href="/portfolio">View Examples</Link>
          </Button>
        </div>

        <div className="rounded-lg border p-6 space-y-4">
          <h2 className="text-2xl font-semibold">UI/UX Design</h2>
          <p>User-centered design solutions that enhance user experience.</p>
          <Button variant="outline" asChild>
            <Link href="/portfolio">View Examples</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
