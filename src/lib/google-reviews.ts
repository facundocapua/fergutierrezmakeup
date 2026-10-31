import 'server-only'

export type Review = {
  authorName: string
  authorUrl: string
  authorPhotoUrl: string
  text: string
  rating: number
}

type PlacesApiReview = {
  name: string
  rating?: number
  text?: { text: string }
  originalText?: { text: string }
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
}

// Google Business profile of the Studio in Benalmádena (Málaga).
const PLACE_ID = 'ChIJKfwidF79cg0RB7y7JlmiVQI'
const ONE_DAY_IN_SECONDS = 86400

/**
 * Fetches the Studio's Reviews from Google Places API (New).
 * Returns an empty list when the API key is missing or the request fails, so the
 * Reviews section is simply not rendered.
 */
export async function getReviews(): Promise<Review[]> {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) return []

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: { 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': 'reviews' },
      next: { revalidate: ONE_DAY_IN_SECONDS }
    })
    if (!response.ok) return []
    const data = (await response.json()) as { reviews?: PlacesApiReview[] }
    return (data.reviews ?? []).map(toReview).filter((review) => review.text !== '')
  } catch {
    return []
  }
}

// The API translates reviews to the request language; show them as the author wrote them.
const toReview = (review: PlacesApiReview): Review => ({
  authorName: review.authorAttribution?.displayName ?? '',
  authorUrl: review.authorAttribution?.uri ?? review.name,
  authorPhotoUrl: review.authorAttribution?.photoUri ?? '',
  text: review.originalText?.text ?? review.text?.text ?? '',
  rating: review.rating ?? 0
})
