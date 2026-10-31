/**
 * Downscales and recompresses the JPG/WebP images under public/ in place.
 * Images are capped at 2400px on the long edge (enough for the lightbox on retina
 * screens; next/image generates the smaller variants) and only replaced when the
 * result is at least 5% smaller. Safe to run repeatedly.
 *
 * Usage: pnpm images:optimize [dir]
 */
import sharp from 'sharp'
import { readdir, rename, stat, unlink } from 'node:fs/promises'
import { join, extname } from 'node:path'

const MAX_EDGE = 2400
const files = []
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await walk(p)
    else if (['.jpg', '.jpeg', '.webp'].includes(extname(p))) files.push(p)
  }
}
const ROOT = process.argv[2] ?? 'public'
await walk(ROOT)
let before = 0,
  after = 0
for (const file of files) {
  const size = (await stat(file)).size
  const img = sharp(file).rotate()
  const { width, height } = await sharp(file).metadata()
  const pipeline = img.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
  const out =
    extname(file) === '.webp'
      ? pipeline.webp({ quality: 80 })
      : pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true })
  await out.toFile(file + '.tmp')
  const newSize = (await stat(file + '.tmp')).size
  if (newSize < size * 0.95) {
    await rename(file + '.tmp', file)
    after += newSize
  } else {
    await unlink(file + '.tmp')
    after += size
  }
  before += size
  const m = await sharp(file).metadata()
  console.log(
    `${file}: ${width}x${height} ${Math.round(size / 1024)}K -> ${m.width}x${m.height} ${Math.round((await stat(file)).size / 1024)}K`
  )
}
console.log(`total ${Math.round(before / 1024)}K -> ${Math.round(after / 1024)}K`)
