import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Every crawler may read the whole site, AI ones included. The owner decided (November 2026) to
 * allow training crawlers too (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended…), so a
 * single rule covers search, training and user-triggered bots. Don't add a group for one bot:
 * a named group replaces `*` for that bot. See docs/research/llm-agents.md (O1).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`
  }
}
