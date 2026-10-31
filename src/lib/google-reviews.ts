import 'server-only'

export type Review = {
  author_name: string
  author_url: string
  profile_photo_url: string
  text: string
  rating: number
  time: number
}

// Google Business profile of the Studio in Benalmádena (Málaga).
const PLACE_ID = 'ChIJKfwidF79cg0RB7y7JlmiVQI'
const ONE_DAY_IN_SECONDS = 86400

/**
 * Fetches the Studio's Reviews from the (legacy) Google Places Details API.
 * Returns an empty list when the API key is missing or the request fails, so the
 * Reviews section is simply not rendered.
 */
export async function getReviews(): Promise<Review[]> {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) return []

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  url.searchParams.set('place_id', PLACE_ID)
  url.searchParams.set('fields', 'reviews')
  url.searchParams.set('key', apiKey)
  url.searchParams.set('reviews_no_translations', 'true')

  try {
    const response = await fetch(url, { next: { revalidate: ONE_DAY_IN_SECONDS } })
    if (!response.ok) return []
    const data = (await response.json()) as { result?: { reviews?: Review[] } }
    return data.result?.reviews ?? []
  } catch {
    return []
  }
}
