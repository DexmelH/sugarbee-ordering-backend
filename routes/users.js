const express =  require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const user = require("..models/users")
users.user(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
  }

  user.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if(!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash
        user.create(userData)
        .then(user => {
          res.json({status: user.email + ' registered'})
        })
        .catch(err => {
          res.send('error: ' + err)
        })
      })
    } else {
      res.json({error: "User already exists"})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

module.exports = users