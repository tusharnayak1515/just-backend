const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Post = require("../models/Post");
const fetchUser = require("../middleware/fetchuser");

// ROUTE-1: Get all the posts using: GET "/api/notes/fetchallnotes". Require Login
router.get('/fetchallposts', fetchUser, async(req, res)=> {
    let success = false;
    try {
        const posts = await Post.find({user: req.user.id});
        success = true;
        res.json({success, posts});
    } catch (error) {
        success = false;
        res.send({success, error: "Internal Server Error", status: 500});
    }
});

// ROUTE-2: Add a new post using: POST "/api/notes/addnote". Require Login
router.post('/addpost', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min:3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min:5 })
], async(req, res)=> {
    let success = false;
    try {
        const {title,description,tag} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            success = false;
            return res.json({ success, errors: errors.array() , status: 400 })
        }
        const post = new Post({
            title,description,tag,user: req.user.id
        })
        const savedPost = await post.save();
        success = true;
        res.json({success, savedPost, status: 200});

    } catch (error) {
        success = false;
        res.send({success, error: "Internal Server Error", status: 500});
    }
});

// ROUTE-3: Update an existing note using: PUT "/api/notes/updatenote". Require Login
router.put('/updatepost/:id', fetchUser, async(req, res)=> {
    let success = false;
    try {
        const {title,description,tag} = req.body;
        let newNote = {title: "", description: "", tag: ""};
        if(title) {
            newNote.title = title;
        }
        if(description) {
            newNote.description = description;
        }
        if(tag) {
            newNote.tag = tag;
        }
        let post = await Post.findById(req.params.id);
        if(!post) {
            success = false;
            return res.send({success, error: "Not Found", status: 404});
        }

        if(post.user.toString() !== req.user.id) {
            success = false;
            return res.send({success, error: "This is not allowed", status: 401})
        }

        post = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        success = true;
        res.json({success, post, status: 200}); 

    } catch (error) {
        success = false;
        res.send({success, error: "Internal Server Error", status: 500});
    }
});

// ROUTE-4: Delete an existing note using: DELETE "/api/notes/deletenote". Require Login
router.delete('/deletepost/:id', fetchUser, async(req, res)=> {
    let success = false;
    try {
        let post = await Post.findById(req.params.id);
        if(!post) {
            success = false;
            return res.send({success, error: "Not Found", status: 404});
        }

        if(note.user.toString() !== req.user.id) {
            success = false;
            return res.send({success, error: "This is not allowed", status: 401})
        }

        post = await Post.findByIdAndDelete(req.params.id);
        success = true;
        res.json({success, post, status: 200}); 

    } catch (error) {
        success = false;
        res.send({success, error: "Internal Server Error", status: 500});
    }
});

module.exports = router;