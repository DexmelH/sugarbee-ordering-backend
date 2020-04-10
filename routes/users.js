const express =  require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userm = require("../models/usersm")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today =  new Date().toJSON();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        created: today,
    }

    userm.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                userm.create(userData)
                .then(user => {
                    res.json({status: user.username + ' registered'})
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
                res.status(400).json({error: err})
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