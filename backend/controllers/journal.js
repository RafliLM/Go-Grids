const Journals = require('../models/journal.js');
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
            currentDate.setHours(0, 0, 0, 0);
            let tommorow = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate() + 1}`)
            const user = await User.findOne(req.user);
            const journal = await Journals.findOne({user_id:user._id, date: { $gte: currentDate, $lt: tommorow }});
            console.log(journal)
            res.status(200).json(journal);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async createJournal(req, res) {
        try {
            let journal = req.body;
            journal.date = new Date(journal.date)
            journal.date.setHours(0,0,0,0)
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
            const journal = await Journals.findById(id)
            const user = req.user //dapetin dari header
            if(journal.user_id.equals(user._id)){
                let newJournal = req.body
                if(newJournal.date){
                    newJournal.date = new Date(newJournal.date)
                    newJournal.date.setHours(0,0,0,0)
                }
                await Journals.findByIdAndUpdate(id, newJournal)
                res.status(200).json({ message: "Successfully update your Journal"});
            }
            else{
                res.status(403).json({message : "Unauthorized"})
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }

    static async deleteJournals(req, res) {
        try {
            const id = req.params.id
            const journal = await Journals.findById(id)
            if(journal.user_id.equals(req.user._id)){
                const deletedJournal = await Journals.findByIdAndDelete(id)
                res.status(200).json({message: "Successfully delete journal"})
            }
            else{
                res.status(403).json({message : "Unauthorized"})
            }
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}   
