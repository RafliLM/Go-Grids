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
                    expiresIn: '4h'
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

const getAllUsername = async (req, res) => {
    try {
        const users = await Users.find({}, {username : 1})
        let usernames = []
        users.forEach(user => usernames.push(user.username))
        usernames.splice(usernames.indexOf(req.user.username), 1)
        res.status(200).json(usernames)
    } catch (error) {
        res.status(400).json({message: error.message})
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
                    user: 'gridsgo@gmail.com',
                    pass: 'ksnmisrcpkdddqsj'
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
                <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                        body {
                            font-family: Arial, sans-serif;
                            font-size: 14px;
                            line-height: 1.5;
                            color: #333;
                            background-color: #f1f1f1;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 40px;
                            border-radius: 4px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            
                        }
                        h1 {
                            font-size: 28px;
                            margin-bottom: 0;
                            color: #f1781a;
                            text-align: center;
                            font-family :'Courier New', Courier, monospace;
                        }
                        p {
                            margin-top: 0;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Informasi Perubahan Password !</h1> <br> 
                            <p>Kepada ${user.firstname} ${user.lastname},</p>
                            <p>Kami Telah menerima permintaan untuk mengubah password akun Go-Grids.</p>
                            <p>Password Baru: ${newPassword}</p>
                            <p>Silahkan gunakan password baru ini untuk masuk ke akun anda. Jangan memberikan informasi ini kepada siapa pun.</p>
                            <p>Jika anda tidak merasa melakukan permintaan ini, silahkan abaikan email ini.</p>
                            <p>Terima kasih telah menggunakan aplikasi kami.</p>
                            <p>Salam Hormat,</p>
                            <p>Go-Grids</p>
                            <p>Tekan tombol di bawah ini untuk masuk kedalam aplikasi Go-Grids</p>
                        </div>
                    </body>
                    </html>
                `
            }, (err, result) => {
                if(err){
                    res.status(500).json({message : err.message})
                }
                else{
                    res.status(200).json({message : "Reset password success", email : user.email})
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
    getAllUsername,
    findUsersByUsername,
    resetPassword
}

module.exports = userController