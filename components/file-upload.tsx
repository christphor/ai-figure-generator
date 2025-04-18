"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function FileUpload() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedSize, setSelectedSize] = useState('1:1')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('size', selectedSize)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('上传失败')
      }

      const data = await response.json()
      console.log('上传成功:', data)

      // 调用生成API
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: data.url,
          size: selectedSize
        }),
      })

      if (!generateResponse.ok) {
        throw new Error('生成失败')
      }

      const generateResult = await generateResponse.json()
      console.log('生成成功:', generateResult)

      // 跳转到结果页面
      router.push(`/result?url=${encodeURIComponent(data.url)}&generateResult=${encodeURIComponent(JSON.stringify(generateResult))}`)
    } catch (error) {
      console.error('处理失败:', error)
      alert('处理失败，请重试')
    } finally {
      setLoading(false)
    }
  }, [router, selectedSize])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    disabled: loading
  })

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-[120px] bg-white">
            <SelectValue placeholder="选择尺寸" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1:1">1:1 正方形</SelectItem>
            <SelectItem value="3:2">3:2 横向</SelectItem>
            <SelectItem value="2:3">2:3 纵向</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card {...getRootProps()} className="border-2 border-dashed cursor-pointer hover:border-pink-500 transition-colors">
        <CardContent className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-pink-600" />
            ) : (
              <Upload className="h-6 w-6 text-pink-600" />
            )}
          </div>
          {isDragActive ? (
            <p className="text-pink-600">释放文件以上传</p>
          ) : (
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-gray-600">
                拖放文件到此处，或点击选择文件
              </p>
              <p className="text-xs text-gray-500">
                支持 PNG, JPG, JPEG, GIF
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <input {...getInputProps()} />
    </div>
  )
}
