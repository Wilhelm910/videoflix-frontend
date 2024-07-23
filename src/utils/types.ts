export type UserProps = {
    first_name: string
    last_name: string
    email: string
    password: string
    is_verified: boolean
}


export type VideoDetails = {
    id: number
    title: string
    description: string
    created_at: string
    video_file: string
    // video_file_480p?: string
    thumbnail: string
    categories: string[]
    favourite: boolean
    group: string
}