import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getMorphBake } from '../src/lib/metaMorphPaths.ts'

const out = resolve(dirname(fileURLToPath(import.meta.url)), '../public/meta-morph/baked-paths.json')
const bake = getMorphBake(40)

mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify(bake))
console.log(`Wrote ${out} (${bake.steps} steps, ${bake.toCircle.length} frames per direction)`)
