export function normalizeTags(tags: string | string[]): string[] {
  return typeof tags === 'string'
    ? tags.split(',').map(t => t.trim()).filter(Boolean)
    : tags
}
