import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A modern e-commerce platform with advanced features.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure and user-friendly mobile banking application.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Healthcare Dashboard",
      description: "Comprehensive dashboard for healthcare professionals.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "Travel Booking System",
      description: "All-in-one travel booking and management system.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Our Portfolio</h1>
        <p className="text-xl text-muted-foreground">Explore our recent projects and case studies.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="rounded-lg border overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <p>{project.description}</p>
              <Button variant="outline">View Project</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
