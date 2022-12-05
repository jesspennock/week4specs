require('dotenv').config()

const express = require("express")
const cors = require("cors")

const { sequelize } = require("./util/database")
const {User} = require("./models/user")
const {Post} = require("./models/post")
const {PORT} = process.env

const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controller/posts')
const {register, login} = require('./controller/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

//AUTH
app.post('/register', register)
app.post('/login', login)

// GET POSTS
app.get('/posts', getAllPosts)

//CRUD POSTS - auth required
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

sequelize.sync()
.then(()=> {
    app.listen(PORT, () => console.log(`db sync successful and server running on port ${PORT}`) )
})