import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, size } = await req.json()
    console.log('收到生成请求:', { imageUrl, size })

    const requestBody = {
      prompt: `Create a high‑resolution 3‑D render of an action‑figure toy featuring the person in the reference photo. 
– Reproduce their hairstyle, facial structure, skin tone, expression, and body shape exactly. 
– Keep the outfit identical to what they are wearing, including every colour, cut, fabric texture, logo, emblem, pattern, and accessory. 
– Identify all gear or tools the person carries and place miniature versions of these items next to the figure inside the package. 

Display the figure in a clear blister attached to a minimalist kraft‑card backer. 
Write the character's name in large white letters at the top of the card (use any visible name badge or printed text on the clothing; if none is present, invent a catchy two‑word name). 
Put a short job title that best matches the gear or context directly beneath the name. 
Add a small brand logo in the top‑right corner. 

Overall style: cute and cartoonish yet clean and polished. 
Use a straight‑on product‑shot camera angle with soft studio lighting and a subtle shadow beneath the blister. 
Ensure every logo, badge, patch, or texture on the outfit and gear is rendered clearly enough to be read or recognised.`,
      imageUrl,
      size
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer 4e48d6b03667e511a646182a7a882885'
    }

    console.log('发送生成请求参数:', JSON.stringify(requestBody, null, 2))
    console.log('请求头:', JSON.stringify(headers, null, 2))

    const response = await fetch('https://kieai.erweima.ai/api/v1/gpt4o-image/generate', {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error('生成请求失败')
    }

    const data = await response.json()
    console.log('生成响应:', data)

    return NextResponse.json(data)
  } catch (error) {
    console.error('生成失败:', error)
    return NextResponse.json(
      { error: '生成失败' },
      { status: 500 }
    )
  }
}
