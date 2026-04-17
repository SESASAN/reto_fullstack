export type ProductRating = {
  rate: number
  count: number
}

/**
 * Product model aligned to FakeStore API.
 * https://fakestoreapi.com/
 */
export type Product = {
  id: number
  title: string
  description: string
  price: number
  category: string
  image: string
  rating?: ProductRating
}
