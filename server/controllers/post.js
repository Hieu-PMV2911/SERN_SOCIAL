const express = require('express')
const route = express.Router()
const {User} = require('../models')
const {Posts, Likes, Comments} = require('../models')
const {ValidateToken} = require('../middlewares/AuthMiddleware')

route.get('/', async (req, res) => {
	const posts = await Posts.findAll({include:[Comments], include:[Likes]});
	// const likePost = await Likes.findAll({where: {UserId: req.user.id}});
	res.json({
		posts: posts
		// likePost: likePost
	})
})

route.get('/byId/:id', async (req, res) => {
	const createPost = req.params.id;
	const findPost = await Posts.findByPk(createPost);
	res.json({posts : findPost})
})


route.post('/posts', async (req, res) => {
	const createPost = req.body;
	const id = req.params.id;
	await Posts.create(createPost);
	res.json(createPost)
})


module.exports = route;