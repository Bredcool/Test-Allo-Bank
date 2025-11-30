export interface Rocket {
    id: string
    name: string
    description: string
    flickr_images: string[]
    country?: string
    first_flight?: string
    cost_per_launch?: number
}