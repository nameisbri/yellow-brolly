import { createClient } from '@supabase/supabase-js'

const SITE_SLUG = 'yellowbrolly'

let cached: Record<string, string> | null = null

export async function getCMSContent(): Promise<Record<string, string>> {
  if (cached) return cached

  const url = import.meta.env.SUPABASE_URL
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    cached = {}
    return cached
  }

  try {
    const supabase = createClient(url, key, { db: { schema: 'cms' } })

    const { data: site } = await supabase
      .from('sites')
      .select('id')
      .eq('slug', SITE_SLUG)
      .single()

    if (!site) {
      cached = {}
      return cached
    }

    const { data } = await supabase
      .from('content')
      .select('value, field:fields(key)')
      .eq('site_id', site.id)

    cached = Object.fromEntries(
      (data ?? []).map((row: any) => [row.field.key, row.value])
    )
  } catch {
    cached = {}
  }

  return cached
}

export function cms(
  content: Record<string, string>,
  key: string,
  fallback: string
): string {
  return content[key] || fallback
}
