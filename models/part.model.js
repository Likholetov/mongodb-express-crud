import { Schema, model } from 'mongoose';

const PartSchema = new Schema({
    name: {
        type: String,
        required: 'Поле не может быть пустым'
    },
    price: {
        type: Number,
        required: 'Поле не может быть пустым'
    },
    type: {
        type: String,
        required: 'Поле не может быть пустым'
    },
    brand: {
        type: String,
        required: 'Поле не может быть пустым'
    },
    cars: {
        type: [String],
        default: [],
        required: 'Поле не может быть пустым'
    },
    installation: {
        type: Number,
        required: 'Поле не может быть пустым'
    },
    image: {
        type: String,
        required: 'Поле не может быть пустым'
    },
    about: {
        type: String,
        required: 'Поле не может быть пустым'
    }
})

model('parts', PartSchema)