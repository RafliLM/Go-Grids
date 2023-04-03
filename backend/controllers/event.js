const Events = require('../models/event.js');
const Users = require('../models/user');
const mongoose = require('mongoose');


module.exports = class API {
    static async getAllEvents(req, res) {
        try {
            const events = await Events.find({
                $or : [
                    {
                        creator:req.user._id
                    },
                    {
                        participants : {
                            $elemMatch : {
                                username : req.user.username,
                                status : "joined"
                            }
                        }
                    }
                ]
            });
            res.status(200).json(events);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async getTodayEvents(req, res) {
        try {
            let start = new Date()
            start.setHours(0,0,0,0)
            let end = new Date()
            end.setHours(23,59,59,999)
            const events = await Events.find(
                { $and : 
                    [
                        {
                            $or : [
                                {
                                    creator : req.user._id
                                },
                                {
                                    participants : {
                                        $elemMatch : {
                                            username : req.user.username,
                                            status : "joined"
                                        }
                                    }
                                }
                            ],
                        },
                        {
                            timeHeld : {$gte : start ,$lte : end}
                        }
                    ]
                }
            )
            res.status(200).json(events)
        } catch (error) {
            res.status(400).json({ message : error.message })
        }
    }

    static async getInvitation(req, res){
        try {
            const events = await Events.find({
                $and : [
                    {
                        participants : {
                            $elemMatch : {
                                username : req.user.username,
                                status : "invited"
                            }
                        }
                    },
                    {
                        timeHeld : {$gte : new Date()}
                    }   
                ]
                
            })
            res.status(200).json(events)
        } catch (error) {
            res.status(400).json({message : error.message})
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
                    if (search){
                        if(req.user.username == search.username)
                            return res.status(400).json({message : `Cant invite event creator`})
                        temp.push({username : event.participants[i]})
                    }
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
            let event = await Events.findById(eventId)
            if(event){
                if(req.user._id.equals(event.creator)){
                    let body = req.body;
                    let temp = []
                    body.creator = req.user._id
                    if(body.timeHeld){
                        body.timeHeld = new Date(body.timeHeld)
                    }
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
                    await Events.findByIdAndUpdate(req.params.id, body)
                    res.status(200).json({ message: "Successfully update Event" })
                }
                else{
                    res.status(403).json({ message : "Unauthorized"})
                }
            }
            else
                res.status(404).json({message : "Event not found"})
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async deleteEvent(req, res) {
        try {
            const event = await Events.findById(req.params.id)
            if(event){
                if(req.user._id.equals(event.creator)){
                    await Events.findByIdAndDelete(req.params.id)
                    res.status(200).json({ message: "Successfully Delete your Event" })
                }
                else{
                    res.status(403).json({ message : "Unauthorized"})
                }
            }
            else{
                res.status(404).json({ message: "Event not found"})
            }
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async acceptEvent(req, res){
        try {
            let event = await Events.findById(req.params.id)
            if (event){
                for(let i = 0; i < event.participants.length; i++){
                    if(event.participants[i].username == req.user.username){
                        if(event.participants[i].status == 'invited'){
                            event.participants[i].status = 'joined'
                            await Events.findByIdAndUpdate(req.params.id, event)
                            return res.status(200).json({message : "Succesfully joined event"})
                        }
                        else{
                            return res.status(400).json({message : "Event already accepted"})
                        }
                    }
                }
                res.status(403).json({message : "User is not invited"})
            }
            else{
                res.status(404).json({ message: "Event not found"})
            }
        } catch (error) {
            res.status(400).json({message : error.message})
        }
    }

    static async declineEvent(req, res){
        try {
            let event = await Events.findById(req.params.id)
            if(event){
                for(let i = 0; i < event.participants.length; i++){
                    if(event.participants[i].username == req.user.username){
                        if(event.participants[i].status == 'invited'){
                            event.participants.splice(i,1)
                            await Events.findByIdAndUpdate(req.params.id, event)
                            return res.status(200).json({message : "Succesfully declined event"})
                        }
                        else{
                            return res.status(400).json({message : "Event already accepted"})
                        }
                    }
                }
                res.status(403).json({message : "User is not invited"})
            }
            else{
                res.status(404).json({ message: "Event not found"})
            }
        } catch (error) {
            res.status(400).json({message : error.message})
        }

    }
}   