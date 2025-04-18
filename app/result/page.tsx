'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ModelViewer } from '@/components/model-viewer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import { Progress } from "@/components/ui/progress"

interface GenerationResponse {
  code: number
  msg: string
  data: {
    taskId: string
    paramJson: string
    completeTime: string
    response: {
      resultUrls: string[]
    }
    successFlag: number
    status: string
    errorCode: number
    errorMessage: string
    createTime: string
    progress: string
  }
}

export default function ResultPage() {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [generationStatus, setGenerationStatus] = useState<string>('pending')
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  // 定义轮询函数
  const pollGenerationStatus = useCallback(async (taskId: string) => {
    try {
      const pollUrl = `https://kieai.erweima.ai/api/v1/gpt4o-image/record-info?taskId=${taskId}`
      console.log('发送轮询请求:', pollUrl)
      
      const response = await axios.get<GenerationResponse>(pollUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer 4e48d6b03667e511a646182a7a882885'
        }
      })
      
      console.log('轮询响应数据:', JSON.stringify(response.data, null, 2))
      
      if (!response.data || !response.data.data) {
        console.error('响应数据格式错误:', response.data)
        return false
      }

      const responseData = response.data.data
      
      // 更新进度
      const currentProgress = parseFloat(responseData.progress || '0') * 100
      console.log('当前进度:', currentProgress)
      setProgress(currentProgress)

      // 检查是否有resultUrls
      if (responseData.response?.resultUrls?.length > 0) {
        const imageUrl = responseData.response.resultUrls[0]
        console.log('生成成功，图片URL:', imageUrl)
        setGenerationStatus('success')
        setGeneratedImageUrl(imageUrl)
        setProgress(100)
        return true
      } else if (responseData.status === 'FAILED') {
        console.error('生成失败:', responseData.errorMessage)
        setGenerationStatus('failed')
        setError(responseData.errorMessage || '生成失败')
        return true
      }
      
      return false
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('轮询请求失败:', {
        error: axiosError.message,
        response: axiosError.response?.data
      })
      setError('轮询出错')
      return true
    }
  }, [])

  useEffect(() => {
    const url = searchParams.get('url')
    const generateResult = searchParams.get('generateResult')
    
    if (url && generateResult) {
      try {
        const parsedResult = JSON.parse(generateResult)
        console.log('初始生成请求结果:', parsedResult)
        setResult(parsedResult)
        
        // 开始轮询生成状态
        if (parsedResult.data?.taskId) {
          const taskId = parsedResult.data.taskId
          console.log('开始轮询任务ID:', taskId)

          // 立即执行一次轮询
          const initialPoll = async () => {
            const shouldStop = await pollGenerationStatus(taskId)
            if (!shouldStop) {
              // 设置定时轮询
              const pollInterval = setInterval(async () => {
                const shouldStop = await pollGenerationStatus(taskId)
                if (shouldStop) {
                  clearInterval(pollInterval)
                }
              }, 5000)

              // 组件卸载时清除定时器
              return () => {
                console.log('停止轮询')
                clearInterval(pollInterval)
              }
            }
          }

          initialPoll()
        } else {
          console.error('未找到任务ID，当前结果:', parsedResult)
          setError('未找到任务ID')
        }
      } catch (e) {
        console.error('解析结果失败:', e)
        setError('解析结果失败')
      }
    } else {
      console.error('缺少必要参数:', { url, generateResult })
      setError('缺少必要参数')
    }
    setLoading(false)
  }, [searchParams, pollGenerationStatus])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>错误</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/'}>返回首页</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">生成结果</h1>
        <p className="text-lg text-muted-foreground">
          {generationStatus === 'pending' ? '正在生成图片...' : '生成完成'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold tracking-tight">原始图片</CardTitle>
            <CardDescription className="text-sm">你上传的图片</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-4">
            <div className="relative w-full max-w-xs aspect-square">
              <img 
                src={searchParams.get('url') || ''} 
                alt="原始图片" 
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                loading="eager"
                decoding="async"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold tracking-tight">生成结果</CardTitle>
            <CardDescription className="text-sm">
              {generationStatus === 'pending' ? 'AI正在生成图片...' : 'AI生成的图片'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-4">
            {generationStatus === 'pending' ? (
              <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-xs">
                <div className="relative">
                  <Loader2 className="h-10 w-10 animate-spin text-pink-600" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium text-pink-600">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-pink-600 transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    正在生成中，请稍候...
                  </p>
                </div>
              </div>
            ) : generatedImageUrl ? (
              <div className="relative w-full max-w-xs aspect-square">
                <img 
                  key={generatedImageUrl}
                  src={generatedImageUrl} 
                  alt="生成的图片" 
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-lg">
                  <Button 
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = generatedImageUrl
                      link.setAttribute('download', '')
                      link.setAttribute('target', '_blank')
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    下载图片
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                生成失败
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6">
        <Button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-4 text-base bg-pink-600 hover:bg-pink-700 text-white"
        >
          返回首页
        </Button>
      </div>
    </div>
  )
} 