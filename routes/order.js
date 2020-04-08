const express =  require("express")
const orders = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const ordersm = require("../models/ordersm")
orders.use(cors())

process.env.SECRET_KEY = 'sugarbee'

orders.post('/create', (req, res) => {
    const today =  new Date().toJSON();
    const orderData = {
        creator_id: req.body.creator_id,
        created: today,
        customer_name: req.body.customer_name,
        contact_number: req.body.contact_number,
        email: req.body.email,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        deadline: req.body.deadline,
        pickup_location: req.body.pickup_location,
        delivery_method: req.body.delivery_method,
        delivery_address: req.body.delivery_address,
        discount_type: req.body.discount_type,
        discount_value: req.body.discount_value,
        total_amount: req.body.total_amount,
        payment_status: req.body.payment_status,
        request: req.body.request,
        special_offer: req.body.special_offer,
    }

    ordersm.create(orderData)
    .then(order => {
        res.json({status: order.email + ' registered'})
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

module.exports = orders;