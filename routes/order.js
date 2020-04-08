const express =  require("express")
const orders = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const ordersm = require("../models/ordersm")
orders.use(cors())

process.env.SECRET_KEY = 'sugarbee'

orders.post('/register', (req, res) => {
    const today =  new Date().toJSON();
    const userData = {
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

    ordersm.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                userm.create(userData)
                .then(user => {
                    res.json({status: user.email + ' registered'})
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
            })
        } 
        else {
            res.json({error: "User already exists"})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
    userm.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            } 
            else {
                res.status(400).json({error: 'Password incorrect'})
            }
        } 
        else {
            res.status(400).json({error: 'User does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})

module.exports = users;