import mongoose from 'mongoose'
import '../models/service.model'
import '../models/part.model'
import '../models/order.model'

// подключение MongoDB
mongoose.connect('mongodb://localhost/botcarservice', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))