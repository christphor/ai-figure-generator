"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FileUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log('上传响应:', data)

      if (data.url) {
        // 跳转到结果页面，传递URL和生成结果
        router.push(`/result?url=${encodeURIComponent(data.url)}&generateResult=${encodeURIComponent(JSON.stringify(data.generateResult || {}))}`)
      } else {
        throw new Error(data.error || '上传失败')
      }
    } catch (error) {
      console.error('上传失败:', error)
      alert('上传失败，请重试')
    } finally {
      setIsUploading(false)
    }
  }, [router])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  })

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-500'}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-pink-600 mb-2" />
            <p className="text-gray-600">正在上传...</p>
          </div>
        ) : isDragActive ? (
          <p className="text-pink-600">释放文件以上传</p>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-600">拖放文件到这里，或</p>
            <Button variant="outline">选择文件</Button>
          </div>
        )}
      </div>
    </div>
  )
}
