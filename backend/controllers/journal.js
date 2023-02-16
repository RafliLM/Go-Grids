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
        const date = req.params.date;
        var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        // console.log(token);

        try {
            const user = await User.findOne(req.user);
            const journal = await Journals.find({user_id:user._id, created: { $gte: today }});

            res.status(200).json(journal);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async createJournal(req, res) {
        const journal = req.body;
        journal.user_id = req.user;
        // console.log(post)
        try {
            await Journals.create(journal)
            res.status(201).json({ message: "Successfully create new Journal" })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async updateJournal(req, res) {
        const id = mongo.ObjectId(req.params.id);
        const token = req.user;
        const user = await User.findOne({token:token});
        const newJournals = req.body;
        try {
            await Journals.findOneAndUpdate({user_id:user._id, _id:id},newJournals);
            // await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: "Successfully update your Journal" })
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
