const Events = require('../models/event.js');
const event = require('../models/event.js');
const User = require('../models/user');
const mongo = require('mongodb');


module.exports = class API {
    static async getEvent(req, res) {
        const token = req.headers.token;
        try {
            const user = await User.findOne({token:token});
            const event = await Events.find({user_id:user._id});
            res.status(200).json(event);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async createEvent(req, res) {
        const token = req.headers.token;
        const event = req.body;
        const user = await User.findOne({token:token});
        event.user_id = user._id;
        // console.log(post)
        try {
            await Events.create(post)
            res.status(201).json({ message: "Successfully create new Event" })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async updateEvent(req, res) {
        const id = mongo.ObjectId(req.params.id);
        const token = req.headers.token;
        const user = await User.findOne({token:token});
        const newEvents = req.body;
        try {
            await Events.findOneAndUpdate({user_id:user._id, _id:id},newEvents);
            // await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: "Successfully update your Event" })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async deleteEvent(req, res) {
        const id = mongo.ObjectId(req.params.id);
        const token = req.headers.token;
        const user = await User.findOne({token:token});
        try {
            const result = await Events.findOneAndDelete({user_id:user._id, _id : id});
            res.status(200).json({ message: "Successfully Delete your Event" })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}   

function acceptEvent(){

}

function declineEvent(){
    
}

function removeParticipant(){
    
}