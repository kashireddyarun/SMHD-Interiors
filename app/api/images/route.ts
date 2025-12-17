import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const dir = searchParams.get('dir')
    if (!dir) return NextResponse.json({ error: 'dir query required' }, { status: 400 })

    const allowed = ['living', 'bedroom', 'kitchen', 'wardrobe']
    if (!allowed.includes(dir)) return NextResponse.json({ error: 'dir not allowed' }, { status: 400 })

    const publicDir = path.join(process.cwd(), 'public', 'images_in', dir)
    const files = await fs.readdir(publicDir)
    const images = files.filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()

    return NextResponse.json({ images })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'failed' }, { status: 500 })
  }
}
