const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        let user = req.body
        let result = user.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,32}$/)
        if(result){
            const salt = bcrypt.genSaltSync(parseInt(process.env.SALT))
            const password = bcrypt.hashSync(user.password, salt)
            user.password = password
            const saveUser = await Users.create(user)
            res.status(201).json({ message : "Successfully registered a new user", saveUser})
        }
        else
            res.status(400).json({ message : "Please input a valid password"})
    } catch (error) {
        res.status(400).json( {
            message : error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await Users.findOne({username})
        if(!user)
            res.status(404).json({message : "username not found"})
        const match = bcrypt.compare(password, user.password)
        if (match) {
            let token = jwt.sign({
                id : user._id
            }, process.env.SECRET, {
                expiresIn: '1h'
            })
            res.status(200).json({token})
        }
        else {
            res.status(403).json({message : "Wrong Password"})
        }
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        let user = req.body
        if(password){
            let result = user.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,32}$/)
            if(result){
                const salt = bcrypt.genSaltSync(parseInt(process.env.SALT))
                const password = bcrypt.hashSync(user.password, salt)
                user.password = password
            }
        }
        else{

        }

        const updateuser = await Users.findByIdAndUpdate(req.user.id, )
    } catch (error) {
        res.send(error.message)
    }
}

const getUserProfile = async (req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
}

const findUsersByUsername = async (req, res) => {
    try {
        const users = await Users.find({username : {$regex: req.params.username, $options: "$i"}})
        res.status(200).json(users)
    } catch (error) {
        res.send(error)
    }
}


const userController = {
    register,
    login,
    updateProfile,
    getUserProfile,
    findUsersByUsername
}

module.exports = userController