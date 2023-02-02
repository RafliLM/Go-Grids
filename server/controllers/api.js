const Post = require('../models/posts.js');
const fs = require('fs');
const User = require('../models/user');
const posts = require('../models/posts.js');
const mongo = require('mongodb');

module.exports = class API {
    // fetch all journals
    static async fetchAllJournals(req, res) {
        const token = req.headers.token;
        try {
            const user = await User.findOne({token:token});
            const posts = await Post.find({user_id:user._id});
            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async fetchAllJournalsByDate(req, res) {
        const token = req.headers.token;
        const date = req.params.date;
        let afterDate = date.split('-')
        afterDate[2] = (parseInt(afterDate[2]) + 1).toString()
        afterDate = afterDate.join('-')
        console.log(afterDate)
        // console.log(token);

        try {
            const user = await User.findOne({token:token});
            const posts = await Post.find({user_id:user._id, created: { $gte: date, $lte: afterDate }});

            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async fetchPostByID(req, res) {
        const id = req.params.id;
        const token = req.headers.token;
        try {
            const user = await User.findOne({token:token});
            const post = await Post.findOne({token:user.token, _id:id});
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async createJournals(req, res) {
        const token = req.headers.token;
        const post = req.body;
        const user = await User.findOne({token:token});
        // console.log(token);
        // const imagename = req.file.filename;
        // post.image = imagename;
        post.user_id = user._id;
        // console.log(post)
        try {
            await Post.create(post)
            res.status(201).json({ message: "Successfully create new Journal" })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async manageJournals(req, res) {
        const id = mongo.ObjectID(req.params.id);
        // const id = req.params.id;
        const token = req.headers.token;
        const user = await User.findOne({token:token});
        const newPost = req.body;
        try {
            await Post.findOneAndUpdate({user_id:user._id, _id:id},newPost);
            // await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: "Successfully update your Journal" })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    static async deleteJournals(req, res) {
        const id = mongo.ObjectID(req.params.id);
        const token = req.headers.token;
        const user = await User.findOne({token:token});
        // const user = await User.findOne({token:token});
        try {
            const result = await Post.findOneAndDelete({user_id:user._id, _id : id});
            // if (result.image != '') {
            //     try {
            //         fs.unlinkSync('./uploads/'+result.image);
            //     } catch (error) {
            //         console.log(error)
            //     }
            // }
            res.status(200).json({ message: "Successfully Delete your Journal" })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}   