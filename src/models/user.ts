import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    mail: {
        type: String,
        required: false,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
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

