import { NextRequest } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const { filesUrl } = await req.json()
    console.log('收到生成请求，图片URL:', filesUrl)

    const data = JSON.stringify({
      filesUrl: [filesUrl], // 将单个URL转换为数组
      prompt: "Generate a cute 3D character based on the uploaded image",
      size: "1:1",
      callBackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback` // 需要设置环境变量
    })

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kieai.erweima.ai/api/v1/gpt4o-image/generate',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Authorization': 'Bearer 4e48d6b03667e511a646182a7a882885'
      },
      data: data
    }

    const response = await axios.request(config)
    console.log('生成请求成功:', response.data)
    
    return new Response(JSON.stringify(response.data), { status: 200 })
  } catch (error) {
    console.error('生成请求失败:', error)
    return new Response(JSON.stringify({ error: '生成失败' }), { status: 500 })
  }
}
