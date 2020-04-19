import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    profile: {
        type: Object,
        required: true,
        name: {
            type: String,
            required: true
        },
        bio: String,
        age: {
            type: String,
            required: true,
        },
        photos_base_64: {
            type: Array,
            required: true,
        },
        gender: {
            type: String,
            required: true
        }
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
},{ timestamps: true })

export default model('tinzapUsers', userSchema)

