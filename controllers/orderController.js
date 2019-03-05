import express from 'express'
import mongoose from 'mongoose'
import '../models/order.model'

const router = express.Router()
const Order = mongoose.model('orders')

router.get('/', (req, res) => {
    res.render("orders/addOrEdit", {
        viewTitle : "Добавить заказ"
    })
})

router.get('/list', (req, res) => {
    Order.find((err, docs) => {
        if (!err) {
            res.render("orders/list", {
                list: docs
            })
        } else {
            console.log(err)
        }
    })
})

router.get('/:id', (req, res) => {
    Order.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('orders/addOrEdit', {
                viewTitle: "Редактировать заказ",
                order: doc
            })
        } else {
            console.log(err)
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/orders/list')
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
    let order = new Order()
    order.telegramId = req.body.telegramId
    order.part = req.body.part
    order.status = req.body.status
    order.save((err, doc) => {
        if (!err) {
            res.redirect('orders/list')
        } else {
            console.log(err)
        }
    })
}

function updateRecord(req, res) {
    Order.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if (!err) {
            res.redirect('orders/list')
        } else {
            console.log(err)
        }
    })
}

export default router