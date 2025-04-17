// 文件位置：app/api/upload/route.ts
import { NextRequest } from 'next/server'
import 'server-only'

// 关闭默认的 bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
}

async function getSmmsToken() {
  console.log('正在获取sm.ms token...')
  const tokenRequest = {
    url: 'https://sm.ms/api/v2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      username: process.env.SMMS_USERNAME,
      password: process.env.SMMS_PASSWORD,
    }
  }
  // 创建一个新的对象用于日志，包含实际的环境变量值
  const logRequest = {
    ...tokenRequest,
    body: {
      username: process.env.SMMS_USERNAME,
      password: '******' // 出于安全考虑，密码用星号代替
    }
  }
  console.log('Token请求参数:', JSON.stringify(logRequest, null, 2))

  const response = await fetch(tokenRequest.url, {
    method: tokenRequest.method,
    headers: tokenRequest.headers,
    body: JSON.stringify(tokenRequest.body),
  })

  const data = await response.json()
  console.log('获取token响应:', data)

  if (data.success) {
    console.log('获取token成功')
    return data.data.token
  } else {
    console.error('获取token失败:', data.message)
    throw new Error(data.message)
  }
}

export async function POST(req: NextRequest) {
  console.log('上传API路由被调用')
  
  try {
    const formData = await req.formData()
    console.log('表单数据已接收')
    
    const file = formData.get('file') as File
    if (!file) {
      console.error('未找到上传的文件')
      return new Response(JSON.stringify({ error: '未上传文件' }), { status: 400 })
    }

    // 获取sm.ms token
    const token = await getSmmsToken()

    // 上传到sm.ms
    console.log('正在发送到sm.ms...')
    const smFormData = new FormData()
    smFormData.append('smfile', file)
    smFormData.append('format', 'json')

    const uploadRequest = {
      url: 'https://sm.ms/api/v2/upload',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
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

    if (json.success) {
      console.log('上传成功, URL:', json.data.url)
      return new Response(JSON.stringify({ url: json.data.url }), { status: 200 })
    } else {
      console.error('sm.ms上传失败:', json.message)
      return new Response(JSON.stringify({ error: json.message }), { status: 500 })
    }
  } catch (error) {
    console.error('处理过程中出错:', error)
    return new Response(JSON.stringify({ error: '上传失败' }), { status: 500 })
  }
}
