import express from 'express'
import mongoose from 'mongoose'
import '../models/service.model'

const router = express.Router()
const Service = mongoose.model('services')

router.get('/', (req, res) => {
    res.render("services/addOrEdit", {
        viewTitle : "Добавить услугу"
    })
})

router.get('/list', (req, res) => {
    Service.find((err, docs) => {
        if (!err) {
            res.render("services/list", {
                list: docs
            })
        } else {
            console.log(err)
        }
    })
})

router.get('/:id', (req, res) => {
    Service.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('services/addOrEdit', {
                viewTitle: "Редактировать услугу",
                service: doc
            })
        } else {
            console.log(err)
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Service.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/services/list')
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
    let service = new Service()
    service.name = req.body.name
    service.price = req.body.price
    service.type = req.body.type
    service.save((err, doc) => {
        if (!err) {
            res.redirect('services/list')
        } else {
            console.log(err)
        }
    })
}

function updateRecord(req, res) {
    Service.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if (!err) {
            res.redirect('services/list')
        } else {
            console.log(err)
        }
    })
}

export default router