import express from 'express'
import mongoose from 'mongoose'
import '../models/part.model'

const router = express.Router()
const Part = mongoose.model('parts')

router.get('/', (req, res) => {
    res.render("parts/addOrEdit", {
        viewTitle : "Добавить деталь"
    })
})

router.get('/list', (req, res) => {
    Part.find((err, docs) => {
        if (!err) {
            res.render("parts/list", {
                list: docs
            })
        } else {
            console.log(err)
        }
    })
})

router.get('/:id', (req, res) => {
    Part.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('parts/addOrEdit', {
                viewTitle: "Редактировать деталь",
                part: doc
            })
        } else {
            console.log(err)
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Part.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/parts/list')
        } else {
            console.log(err)
        }
    })
})

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res)
    } else {
        updateRecord(req, res)
    }
})

function insertRecord(req, res) {
    let part = new Part()
    part.name = req.body.name
    part.price = req.body.price
    part.type = req.body.type
    part.brand = req.body.brand
    part.cars = req.body.cars.split(",")
    part.installation = req.body.installation
    part.image = req.body.image
    part.about = req.body.about
    part.save((err, doc) => {
        if (!err) {
            res.redirect('parts/list')
        } else {
            console.log(err)
        }
    })
}

function updateRecord(req, res) {
    Part.findOneAndUpdate({_id: req.body._id}, { $set: { name: req.body.name, price: req.body.price, type: req.body.type, brand: req.body.brand, cars: req.body.cars.split(","), installation: req.body.installation, image: req.body.image, about: req.body.about }}, {new: true}, (err, doc) => {
        if (!err) {
            res.redirect('parts/list')
        } else {
            console.log(err)
        }
    })
}

export default router