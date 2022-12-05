const {User} = require("../models/user")
const {Post} = require("../models/post")


module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getCurrentUserPosts: async (req, res) => {
        try {
            const {userId} = req.params
            const posts = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN get current user posts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addPost: async (req, res) => {
        try{
            const {title, content, status, userId} = req.body
            await Post.create({
                title: title,
                content: content,
                privateStatus: status,
                userId: userId
            })
            res.status(200).send('post added')
        }

        catch (error){
            console.log(error)
            res.status(400).send('error making post')
        }
       
    },

    editPost: async (req, res) => {
        try {
            const {id} = req.params
            const {status} = req.body
            await Post.update(
                {privateStatus: status},
                {where: {id: id}}
            )
            res.status(200).send("Post updated")
        }
        catch (error) {
            console.log(error)
            res.status(400).send("error editing post")
        }
    },

    deletePost: async (req, res) => {
        try{
           const {id}= req.params
           await Post.destroy(
            {where: {id: id}}
           )
           res.status(200).send("Post Deleted")
        }
        catch (error) {
            console.log(error)
            res.status(400).send("Post was not deleted")
        }
        console.log('delete post')
    }
}