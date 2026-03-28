/**
 * Scans source files for cms() calls and generates a manifest with groups.
 * Run before build: node scripts/generate-cms-manifest.mjs
 * Output: public/.cms-manifest.json
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
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

function inferGroup(filePath, key) {
  // Sitewide keys override file-based inference
  if (key === 'phone' || key === 'email') return 'Sitewide / Contact Info'
  if (key.startsWith('footer_')) return 'Sitewide / Footer'

  const parts = filePath.replace(/\.(astro|tsx|ts)$/, '').split('/')

  // Pages: src/pages/about → About / Content
  if (parts.includes('pages')) {
    const page = parts[parts.length - 1]
    if (page === 'index') return 'Homepage / Content'
    const name = page.charAt(0).toUpperCase() + page.slice(1).replace(/-([a-z])/g, (_, c) => ' ' + c.toUpperCase())
    return name + ' / Content'
  }

  // Section components: src/components/sections/ServicesOverview → Homepage / Services Overview
  if (parts.includes('sections')) {
    const comp = parts[parts.length - 1]
    const name = comp.replace(/([a-z])([A-Z])/g, '$1 $2')
    return 'Homepage / ' + name
  }

  // Layout components: src/components/layout/Footer → Sitewide / Footer
  if (parts.includes('layout')) {
    const comp = parts[parts.length - 1]
    return 'Sitewide / ' + comp
  }

  // Astro components
  if (parts.includes('astro')) {
    const comp = parts[parts.length - 1]
    const name = comp.replace(/([a-z])([A-Z])/g, '$1 $2')
    if (['Footer', 'Header', 'Nav', 'Navbar'].includes(comp)) return 'Sitewide / ' + name
    return 'Homepage / ' + name
  }

  // React components
  if (parts.includes('react')) {
    const comp = parts[parts.length - 1]
    const name = comp.replace(/([a-z])([A-Z])/g, '$1 $2')
    if (['Footer', 'Header'].includes(comp)) return 'Sitewide / ' + name
    return 'Homepage / ' + name
  }

  return 'Other / Content'
}

// Match cms(c, 'key', 'fallback') or cms(c, "key", "fallback") — handles apostrophes in fallbacks
const CMS_PATTERN = /cms\(\s*c\s*,\s*['"]([^'"]+)['"]\s*,\s*(?:'([^']*(?:''[^']*)*)'|"([^"]*)"|`([^`]*)`)\s*\)/g

const files = walk(SRC, ['.astro', '.tsx', '.ts'])
const fields = []
const seen = new Set()

for (const file of files) {
  const content = readFileSync(file, 'utf-8')
  const rel = relative(ROOT, file)

  let match
  while ((match = CMS_PATTERN.exec(content)) !== null) {
    const key = match[1]
    const fallback = match[2] ?? match[3] ?? match[4] ?? ''

    if (!seen.has(key)) {
      seen.add(key)
      fields.push({
        key,
        fallback,
        file: rel,
        type: fallback.length > 100 ? 'textarea' : 'text',
        group: inferGroup(rel, key),
      })
    }
  }
}

fields.sort((a, b) => a.group.localeCompare(b.group) || a.key.localeCompare(b.key))

const manifest = { generatedAt: new Date().toISOString(), fields }
writeFileSync(resolve(ROOT, 'public', '.cms-manifest.json'), JSON.stringify(manifest, null, 2))

console.log(`CMS manifest: ${fields.length} fields found`)
