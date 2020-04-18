export interface User {
    _id: string,
    profile: {
        name: string,
        bio: string,
        age: string,
        photos_base_64: string[]
    },
    likes: string[],
    dislikes: string[]
}