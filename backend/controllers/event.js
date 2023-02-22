const Events = require('../models/event.js');
const event = require('../models/event.js');
const Users = require('../models/user');
const mongoose = require('mongoose');
const { findById } = require('../models/event.js');


module.exports = class API {
    static async getAllEvents(req, res) {
        try {
            const user = await Users.findOne({token:token});
            const event = await Events.find({user_id:user._id});
            res.status(200).json(event);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async getTodayEvents(req, res) {
        try {
            const events = await Events.find({timeHeld : {$lte : new Date().setHours(23, 59, 59)}})

        } catch (error) {
            
        }
    }

    static async createEvent(req, res) {
        try {
            let event = req.body;
            let temp = []
            event.creator = req.user._id
            event.timeHeld = new Date(event.timeHeld)
            if(event.participants && event.participants.length != 0) {
                for(let i = 0; i < event.participants.length; i++){
                    let search = await Users.findOne({username : event.participants[i]})
                    if (search)
                        temp.push({username : event.participants[i]})
                    else
                        return res.status(404).json({message : `Username ${event.participants[i]} not found`})
                }
            }
            event.participants = temp
            await Events.create(event)
            res.status(201).json({ message: "Successfully create new Event" })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async updateEvent(req, res) {
        try {
            let eventId = req.params.id
            let event = await findById(eventId)
            if(event){
                let body = req.body;
                let temp = []
                body.creator = req.user._id
                body.timeHeld = new Date(body.timeHeld)
                if(body.participants && body.participants.length != 0) {
                    for(let i = 0; i < body.participants.length; i++){
                        let search = await Users.findOne({username : body.participants[i]})
                        if (search)
                            temp.push({username : body.participants[i]})
                        else
                            return res.status(404).json({message : `Username ${body.participants[i]} not found`})
                    }
                }
                body.participants = temp
                await Events.create(event)
                res.status(201).json({ message: "Successfully create new Event" })
            }
            else
                res.status(404).json({message : "Event not found"})
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async deleteEvent(req, res) {
        const id = mongo.ObjectId(req.params.id);
        const token = req.user;
        const user = await Users.findOne({token:token});
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