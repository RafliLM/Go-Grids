const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const randexp = require('randexp')

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
        else{
            const match = await bcrypt.compare(password, user.password)
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
        if(user.password){
            let result = user.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,32}$/)
            if(result){
                const salt = bcrypt.genSaltSync(parseInt(process.env.SALT))
                const password = bcrypt.hashSync(user.password, salt)
                user.password = password
            }
        }
        await Users.findByIdAndUpdate(req.user.id, user)
        res.status(200).json({message: "Profile updated successfully"})
    } catch (error) {
        res.status(400).json({message: error.message})
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
        res.status(400).send(error)
    }
}

const resetPassword = async (req, res) => {
    try {
        const username = req.body.username
        const user = await Users.findOne({username})
        if(user){
            let transport = nodemailer.createTransport({
                service : "Gmail",
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'raflilutfiansyah28@gmail.com',
                    pass: 'bzssurdpjrkorxyn'
                }
            })
            let newPassword = new randexp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,32}$/).gen()
            const salt = bcrypt.genSaltSync(parseInt(process.env.SALT))
            const hashedPassword = bcrypt.hashSync(newPassword, salt)
            const updatePassword = await Users.updateOne({
                username : user.username
            }, {
                password : hashedPassword
            })
            transport.sendMail({
                to : user.email,
                subject : "Reset Password",
                html : 
                `
                    <h1>Go Grids</h1>
                    <p>Your new password is ${newPassword}</p>
                `
            }, (err, result) => {
                if(err){
                    res.status(404).json({message : err.message})
                }
                else{
                    res.status(200).json({message : "Reset password success"})
                }
            })
        }
        else{
            res.status(404).json({message : "Username not found"})
        }
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

const userController = {
    register,
    login,
    updateProfile,
    getUserProfile,
    findUsersByUsername,
    resetPassword
}

module.exports = userController