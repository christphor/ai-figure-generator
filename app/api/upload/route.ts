// 文件位置：app/api/upload/route.ts
import { NextRequest } from 'next/server'
import 'server-only'
import axios from 'axios'

const SMMS_TOKEN = 'AcDTdclPmTfGspXGCtJzutHnxi4U6QLE'

// 关闭默认的 bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  console.log('上传API路由被调用')
  console.log('当前SMMS_TOKEN值:', SMMS_TOKEN)
  
  try {
    const formData = await req.formData()
    console.log('表单数据已接收')
    
    const file = formData.get('file') as File
    if (!file) {
      console.error('未找到上传的文件')
      return new Response(JSON.stringify({ error: '未上传文件' }), { status: 400 })
    }

    // 上传到sm.ms
    console.log('正在发送到sm.ms...')
    const smFormData = new FormData()
    smFormData.append('smfile', file)
    smFormData.append('format', 'json')

    const uploadRequest = {
      url: 'https://sm.ms/api/v2/upload',
      method: 'POST',
      headers: {
        Authorization: SMMS_TOKEN
      },
      body: {
        smfile: file.name,
        format: 'json'
      }
    }
    console.log('上传请求参数:', JSON.stringify(uploadRequest, null, 2))

    const smRes = await fetch(uploadRequest.url, {
      method: uploadRequest.method,
      headers: uploadRequest.headers,
      body: smFormData,
    })

    console.log('sm.ms响应状态:', smRes.status)
    const json = await smRes.json()
    console.log('sm.ms响应:', json)

    let imageUrl = ''
    if (json.success) {
      console.log('上传成功, URL:', json.data.url)
      imageUrl = json.data.url
    } else if (json.code === 'image_repeated') {
      console.log('图片已存在, 使用已有URL:', json.images)
      imageUrl = json.images
    } else {
      console.error('sm.ms上传失败:', json.message)
      return new Response(JSON.stringify({ error: json.message }), { status: 500 })
    }

    // 调用生成API
    try {
      const generateData = {
        filesUrl: [imageUrl], // 使用获取到的图片URL
        prompt: "Generate a cute 3D character based on the uploaded image",
        size: "1:1",
        callBackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback`
      }
      console.log('生成API请求参数:', JSON.stringify(generateData, null, 2))

      const generateResponse = await axios.post('https://kieai.erweima.ai/api/v1/gpt4o-image/generate', generateData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer 4e48d6b03667e511a646182a7a882885'
        }
      })
      console.log('生成请求成功:', generateResponse.data)
      
      return new Response(JSON.stringify({ 
        url: imageUrl,
        generateResult: generateResponse.data 
      }), { status: 200 })
    } catch (error) {
      console.error('生成请求失败:', error)
      return new Response(JSON.stringify({ 
        url: imageUrl,
        error: '生成失败' 
      }), { status: 200 })
    }
  } catch (error) {
    console.error('处理过程中出错:', error)
    return new Response(JSON.stringify({ error: '上传失败' }), { status: 500 })
  }
}
