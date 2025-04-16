// 文件位置：app/api/upload/route.ts
import { NextRequest } from 'next/server'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'
import 'server-only'

type FormidableFields = { [key: string]: string | string[] }
type FormidableFiles = { [key: string]: any }

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  const form = new IncomingForm({ uploadDir: '/tmp', keepExtensions: true })

  return new Promise((resolve, reject) => {
    form.parse(req as any, async (err: Error | null, fields: FormidableFields, files: FormidableFiles) => {
      if (err) {
        return resolve(new Response(JSON.stringify({ error: 'Failed to parse form' }), { status: 500 }))
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file
      if (!file || !file.filepath) {
        return resolve(new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 }))
      }

      const formData = new FormData()
      const fileBuffer = fs.readFileSync(file.filepath)
      formData.append('smfile', new Blob([fileBuffer]), file.originalFilename || 'uploaded-file')
      formData.append('format', 'json')

      const smRes = await fetch('https://sm.ms/api/v2/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.SMMS_TOKEN}` // 你的 Token 存在 .env.local 中
        },
      })

      const json = await smRes.json()

      if (json.success) {
        return resolve(new Response(JSON.stringify({ url: json.data.url }), { status: 200 }))
      } else {
        return resolve(new Response(JSON.stringify({ error: json.message }), { status: 500 }))
      }
    })
  })
}
