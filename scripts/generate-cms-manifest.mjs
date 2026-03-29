/**
 * Scans source files for cms() calls and generates a manifest with groups.
 * Preserves page-flow order within each group.
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
  const fileName = parts[parts.length - 1]
  const readableName = fileName.replace(/([a-z])([A-Z])/g, '$1 $2')

  // Pages: src/pages/about → About
  if (parts.includes('pages')) {
    if (fileName === 'index') return 'Homepage'
    return fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-([a-z])/g, (_, c) => ' ' + c.toUpperCase())
  }

  // Section components: src/components/sections/ServicesOverview → Homepage / Services Overview
  if (parts.includes('sections')) {
    return 'Homepage / ' + readableName
  }

  // Layout components → Sitewide
  if (parts.includes('layout')) {
    return 'Sitewide / ' + readableName
  }

  // Astro components (e.g. src/components/astro/Footer)
  if (parts.includes('astro')) {
    if (['Footer', 'Header', 'Nav', 'Navbar'].includes(fileName)) return 'Sitewide / ' + readableName
    return 'Homepage / ' + readableName
  }

  // React components
  if (parts.includes('react')) {
    if (['Footer', 'Header'].includes(fileName)) return 'Sitewide / ' + readableName
    return 'Homepage / ' + readableName
  }

  // Direct components: src/components/Hero → Homepage / Hero
  if (parts.includes('components')) {
    if (['Footer', 'Navbar', 'Nav'].includes(fileName)) return 'Sitewide / ' + readableName
    if (['LocationPage'].includes(fileName)) return 'Locations'
    return 'Homepage / ' + readableName
  }

  return 'Other'
}

// Match cms() calls — handles apostrophes in fallbacks
const CMS_PATTERN = /cms\(\s*(?:c|cmsContent)\s*,\s*['"]([^'"]+)['"]\s*,\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)\s*\)/g

const files = walk(SRC, ['.astro', '.tsx', '.ts'])

// Collect fields preserving encounter order, grouped
const groupedFields = new Map() // group → [{ key, fallback, file, type }]
const seen = new Set()

for (const file of files) {
  const content = readFileSync(file, 'utf-8')
  const rel = relative(ROOT, file)

  let match
  while ((match = CMS_PATTERN.exec(content)) !== null) {
    const key = match[1]
    const fallback = (match[2] ?? match[3] ?? match[4] ?? '').replace(/\\'/g, "'")

    if (!seen.has(key)) {
      seen.add(key)
      const group = inferGroup(rel, key)
      if (!groupedFields.has(group)) groupedFields.set(group, [])
      groupedFields.get(group).push({
        key,
        fallback,
        file: rel,
        type: fallback.length > 100 ? 'textarea' : 'text',
        group,
      })
    }
  }
}

// Sort groups alphabetically, preserve encounter order within each group
const fields = []
const sortedGroups = [...groupedFields.keys()].sort()
for (const group of sortedGroups) {
  fields.push(...groupedFields.get(group))
}

const manifest = { generatedAt: new Date().toISOString(), fields }
writeFileSync(resolve(ROOT, 'public', '.cms-manifest.json'), JSON.stringify(manifest, null, 2))

console.log(`CMS manifest: ${fields.length} fields in ${sortedGroups.length} groups`)
