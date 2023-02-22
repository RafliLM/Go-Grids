const Journals = require('../models/journal.js');
const journal = require('../models/journal.js');
const User = require('../models/user');
const mongo = require('mongodb');
const moment = require('moment');


module.exports = class API {
    static async getAllJournals(req, res) {
        try {
            const user = await User.findOne(req.user);
            const journal = await Journals.find({user_id:user._id});
            res.status(200).json(journal);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async getJournalsByDate(req, res) {
        try {
            let currentDate = req.params.date;
            currentDate = new Date(currentDate);
            currentDate.setHours(0, 0, 0);
            let tommorow = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate() + 1}`)
            console.log(currentDate, tommorow)
            const user = await User.findOne(req.user);
            const journal = await Journals.find({user_id:user._id, date: { $gte: currentDate, $lt: tommorow }});
            res.status(200).json(journal);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async createJournal(req, res) {
        try {
            const journal = req.body;
            journal.user_id = req.user;
            await Journals.create(journal)
            res.status(201).json({ message: "Successfully create new Journal" })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async updateJournal(req, res) {
        try {
            let id = req.params.id
            const user = req.user;
            if(id == user._id){
                id = mongo.ObjectId(req.params.id);
                const newJournals = req.body;
                await Journals.findOneAndUpdate({user_id:user._id, _id:id},newJournals);
                res.status(200).json({ message: "Successfully update your Journal"});
            }
            else{
                res.status(403).json({message : "Unauthorized"})
            }
            
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async deleteJournals(req, res) {
        const id = mongo.ObjectId(req.params.id);
        const token = req.user;
        const user = await User.findOne({token:token});
        try {
            const result = await Journals.findOneAndDelete({user_id:user._id, _id : id});
            res.status(200).json({ message: "Successfully Delete your Journal" })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}   
