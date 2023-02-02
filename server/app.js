require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const User=require('./models/user');
const {auth} =require('./middlewares/auth');
const db=require('./config/config').get(process.env.NODE_ENV);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('uploads'));
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

// Database connection
mongoose
    .connect('mongodb+srv://diana:EVCO9NQyVFmmd9nx@cluster0.laj16hr.mongodb.net/journalizatationable?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Connected to the databases!"))
    .catch((err) => console.log(err))


// adding new user (sign-up route)
app.post('/api/register',function(req,res){
    // taking a user
    const newuser=new User(req.body);
    console.log(newuser);
 
    if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
    
    User.findOne({email:newuser.email},function(err,user){
        if(user) return res.status(400).json({ auth : false, message :"email exits"});
 
        newuser.save((err,doc)=>{
            if(err) {console.log(err);
                return res.status(400).json({ success : false});}
            res.status(200).json({
                succes:true,
                user : doc
            });
        });
    });
 });
 
 
 // login user
 app.post('/api/login', function(req,res){
     let token=req.cookies.auth;
     User.findByToken(token,(err,user)=>{
         if(err) return  res(err);
         if(user) return res.status(400).json({
             error :true,
             message:"You are already logged in"
         });
     
         else{
             User.findOne({'email':req.body.email},function(err,user){
                 if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
         
                 user.comparepassword(req.body.password,(err,isMatch)=>{
                     if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
         
                 user.generateToken((err,user)=>{
                     if(err) return res.status(400).send(err);
                     res.cookie('auth',user.token)
                     res.status(200).json({
                         isAuth : true,
                         id : user._id
                         ,email : user.email
                         ,firstname : user.firstname
                         ,token : user.token
                     });
                 });    
             });
           });
         }
     });
 });
 
 //logout user
  app.get('/api/logout',auth,function(req,res){
         req.user.deleteToken(req.token,(err,user)=>{
             if(err) return res.status(400).send(err);
             res.sendStatus(200);
         });
 
     }); 
 
 // get logged in user
 app.get('/api/profile',auth,function(req,res){
         res.json({
             isAuth: true,
             id: req.user._id,
             email: req.user.email,
             name: req.user.firstname + req.user.lastname
             
         })
 });
 
 
 app.get('/',function(req,res){
     res.status(200).send(`Welcome to login , sign-up api`);
 });
 
 //Routes Prefix
app.use("/api/post", require('./routes/routes'))

 // listening port
 const PORT=process.env.PORT||5000;
 app.listen(PORT,()=>{
     console.log(`app is live at ${PORT}`);
 });

