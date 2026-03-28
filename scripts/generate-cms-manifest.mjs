/**
 * Scans source files for cms() calls and generates a manifest.
 * Run before build: node scripts/generate-cms-manifest.mjs
 * Output: public/.cms-manifest.json
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { resolve, relative } from 'path'

const ROOT = resolve(import.meta.dirname, '..')
const SRC = resolve(ROOT, 'src')

function walk(dir, exts) {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name)
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      results.push(...walk(full, exts))
    } else if (entry.isFile() && exts.some(e => entry.name.endsWith(e))) {
      results.push(full)
    }
  }
  return results
}

// Match cms(c, 'key', 'fallback') or cms(c, 'key', "fallback") — single line
const CMS_PATTERN = /cms\(\s*c\s*,\s*['"]([^'"]+)['"]\s*,\s*['"`]([^'"`]*)['"]\s*\)/g

const files = walk(SRC, ['.astro', '.tsx', '.ts'])
const fields = []
const seen = new Set()

for (const file of files) {
  const content = readFileSync(file, 'utf-8')
  const rel = relative(ROOT, file)

  let match
  while ((match = CMS_PATTERN.exec(content)) !== null) {
    const key = match[1]
    const fallback = match[2]

    if (!seen.has(key)) {
      seen.add(key)
      fields.push({
        key,
        fallback,
        file: rel,
        type: fallback.length > 100 ? 'textarea' : 'text',
      })
    }
  }
}

fields.sort((a, b) => a.key.localeCompare(b.key))

const manifest = { generatedAt: new Date().toISOString(), fields }
writeFileSync(resolve(ROOT, 'public', '.cms-manifest.json'), JSON.stringify(manifest, null, 2))

console.log(`CMS manifest: ${fields.length} fields found`)
