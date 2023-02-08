const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    register : async (req, res) => {
        try {
            let user = req.body
            bcrypt.hash(user.password, process.env.SALT, (err, hash) => {
                user.password = hash
            })
            const saveUser = await Users.create(user)
            res.status(201).json({ message : "Successfully registered a new user", saveUser})
        } catch (error) {
            res.send(error.message)
        }
    },
    login : async (req, res) => {
        try {
            const {username, password} = req.body
            const user = await Users.findOne({username})
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    console.log(user)
                    let token = jwt.sign(user, process.env.SECRET, {
                        expiresIn: '1h'
                    })
                    res.status(200).send(token)
                }
                else {
                    res.status(403).json({message : "Wrong Password"})
                }
            })
        } catch (error) {
            res.send(error.message)
        }
    },
    updateData : async (req, res) => {
        try {
            const token = req.headers.token
            const { firstname, lastname, email} = req.body
            let id = jwt.verify(token, process.env.SECRET)
            id = mongoose.Types.ObjectId(id)
            const user = await Users.updateOne({_id : id}, {
                firstname,
                lastname,
                email
            })
        } catch (error) {
            res.send(error.message)
        }
    },
    getUserById : async (req, res) => {
        try {
            const token = req.headers.token
            let id = jwt.verify(token, process.env.SECRET)
            const mongoose = require('mongoose')
            id = mongoose.Types.ObjectId(id)
            const user = Users.findOne({_id : id})
            if(user)
                res.status(200).json(user)
            else
                res.status(204).json({message : "User Not Found"})
        } catch (error) {
            res.send(error)
        }
    },
    getAllUsers : () => {
        try {
            const users = Users.find({})
            res.status(200).json(users)
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = userController