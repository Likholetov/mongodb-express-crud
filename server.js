import express from 'express'
import path from 'path'
import exphbs from 'express-handlebars'
import bodyparser from 'body-parser'

import './models/db'
import serviceController from './controllers/serviceController'

const app = express()

app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json())
app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }))
app.set('view engine', 'hbs')

app.listen(3000, () => {
    console.log('Express server started at port : 3000')
})

app.use('/services', serviceController)