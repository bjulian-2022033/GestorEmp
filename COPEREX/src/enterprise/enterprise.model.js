import { Schema, model } from 'mongoose'

const enterpriseSchema = Schema({
    enterpriseName:{
        type: String,
        required: true
    },
    impactLevel: {
        type: String,
        required: true
    },
    yearsTrayectory:{
        type: String,
        required: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'category',
        required: true
    }
    
})

export default model ('enterprise', enterpriseSchema)