const express = require('express')
const route = express.Router()
const {Posts, Likes, Comments} = require('../models')
const {ValidateToken} = require('../middlewares/AuthMiddleware')

route.get('/', ValidateToken, async (req, res) => {
	const listPost = await Posts.findAll({include:[Comments], include:[Likes]});
	// const likePost = await Likes.findAll({where: {UserId: req.user.id}});
	res.json({
		listPost: listPost, 
		// likePost: likePost
	})
})

route.get('/byId/:id', ValidateToken, async (req, res) => {
	const createPost = req.params.id;
	const findPost = await Posts.findByPk(createPost);
	res.json(findPost)
})


route.post('/posts', ValidateToken, async (req, res) => {
	const {firstName, lastName, location, 
		description, picturePath, usePicturePath} = req.body;
	const user = await User.findByPk(id);
	const UserId = user.id;
	const firstNames = user.firstName;
	const lastNames = user.lastName;
	const locations = user.location;
	const picturePaths = user.picturePath;
	// createPost.userName = req.user.userName;
	// createPost.UserId = req.user.id;
	try {
		await Posts.create({
			firstName: firstNames, 
			lastName: lastNames, 
			location: locations, 
			description: description, 
			picturePath: picturePaths, 
			usePicturePath: usePicturePath,
			UserId: UserId
		});
		res.json("success");
	} catch (error) {
		res.json({msg: error.message});
	}
})


module.exports = route;