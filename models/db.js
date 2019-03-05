import mongoose from 'mongoose'
import '../models/service.model'

// подключение MongoDB
mongoose.connect('mongodb://localhost/botcarservice', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))