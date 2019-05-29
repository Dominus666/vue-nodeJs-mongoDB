const express = require('express')
const router = express.Router()
const User = require('../models/user-model')
const Post = require('../models/post-model')

router.post('/users', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  })
  user.save((err, data) => {
    if (err) {
      res.status(400).send('User exists.');
    } else {
      res.send(data)
    }
  })
})

router.post('/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.sendStatus(500); 
    if (!user) return res.status(400).send('No user found.');
    if(req.body.password === user.password) {
      Post.find({author: req.body.email}, (err, userPost) => {
        const userInfo = {
          user: user,
          userPosts: userPost
        }
        res.send(userInfo)
      })
    }else {
      res.status(400).send('Do not correct password.')
    }
  })
})

module.exports = router