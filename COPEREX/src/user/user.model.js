import mongoose, { mongo } from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        uppercase: true,
        enum: ['ADMIN'],
        required: true
    }
})

export default mongoose.model('user', userSchema)