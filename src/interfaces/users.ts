export interface User {
    _id: string,
    phone: string,
    profile: {
        social?: {
            instagram: string,
            facebook: string
        },
        name: string,
        bio: string,
        age: string,
        gender: string,
        photos_base_64: string[]
    },
    key: string;
    likes: string[],
    dislikes: string[]
}