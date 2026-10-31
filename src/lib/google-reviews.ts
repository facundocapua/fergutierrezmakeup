import 'server-only'

export type Review = {
  authorName: string
  /** Author's Google Maps profile. */
  authorUrl?: string
  authorPhotoUrl?: string
  /** The Review as the author wrote it (never machine-translated). */
  text: string
  rating: number
  /** e.g. "Hace 7 meses". */
  publishedAgo?: string
  /** The Review on Google Maps. */
  googleMapsUrl: string
}

export type GoogleReviews = {
  rating: number
  reviewCount: number
  /** The Studio's profile on Google Maps. */
  googleMapsUrl: string
  /** Up to 5 Reviews, ordered by relevance by Google. */
  reviews: Review[]
}

type PlacesApiPlace = {
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: Array<{
    rating?: number
    text?: { text: string }
    originalText?: { text: string }
    relativePublishTimeDescription?: string
    googleMapsUri?: string
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
  }>
}

// Google Business profile of the Studio in Benalmádena (Málaga).
const PLACE_ID = 'ChIJKfwidF79cg0RB7y7JlmiVQI'
// Pages using the Reviews are regenerated at most once a day, so new Reviews show up within a day.
const ONE_DAY_IN_SECONDS = 86400

/**
 * Fetches the Studio's rating and Reviews from Google Places API (New).
 * Returns null when the API key is missing or the request fails, so the Reviews
 * section is simply not rendered.
 */
export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) return null

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews'
      },
      next: { revalidate: ONE_DAY_IN_SECONDS }
    })
    if (!response.ok) return null
    const place = (await response.json()) as PlacesApiPlace
    if (!place.googleMapsUri) return null

    const reviews = (place.reviews ?? []).flatMap((review): Review[] => {
      const text = review.originalText?.text ?? review.text?.text
      if (!text || !review.googleMapsUri) return []
      return [
        {
          authorName: review.authorAttribution?.displayName ?? 'Usuario de Google',
          authorUrl: review.authorAttribution?.uri,
          authorPhotoUrl: review.authorAttribution?.photoUri,
          text,
          rating: review.rating ?? 0,
          publishedAgo: review.relativePublishTimeDescription,
          googleMapsUrl: review.googleMapsUri
        }
      ]
    })

    return {
      rating: place.rating ?? 0,
      reviewCount: place.userRatingCount ?? 0,
      googleMapsUrl: place.googleMapsUri,
      reviews
    }
  } catch {
    return null
  }
}
