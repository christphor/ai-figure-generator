"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 300)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)

      // Redirect to results page after "processing"
      setTimeout(() => {
        router.push("/results")
      }, 1000)
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-pink-200 rounded-xl cursor-pointer bg-pink-50 hover:bg-pink-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-pink-500" />
              <p className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="flex flex-col items-center justify-center">
          {preview ? (
            <div className="relative w-full h-64">
              <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-contain rounded-xl" />
            </div>
          ) : (
            <Card className="w-full h-64 flex items-center justify-center bg-gray-50 border border-gray-200">
              <div className="text-center p-4">
                <ImageIcon className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500">Your image preview will appear here</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 text-center">
            {progress < 100 ? "Processing your image..." : "Processing complete!"}
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 w-full md:w-auto"
          disabled={!file || isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Generate 3D Character"
          )}
        </Button>
      </div>
    </form>
  )
}
