const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {Users, Friends} = require('../models');
const {ValidateToken} = require('../middlewares/AuthMiddleware')
route.post('/user/register' ,async (req, res, next) =>{
	const {firstName, lastName, email, 
	password, picturePath, location, 
	occupation} = req.body;

	const salt = await bcrypt.genSalt();
	await bcrypt.hash(password, salt).then((hash) => {		
		Users.create({
			firstName: firstName, 
			lastName: lastName, 
			email: email, 
			password: hash, 
			picturePath: picturePath, 
			location: location, 
			occupation: occupation, 
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000)
		});
		res.status(201).json("Success");
	})
});

route.post('/user/login' ,async (req,res) => {
	const {email, password} = req.body;
	const User = await Users.findOne({where: {email: email}});
	if(!User) return res.status(400).json({errors: 'User does not exist'});

	bcrypt.compare(password, User.password).then((match)=>{
		if(!match) return res.json({errors: "Wrong User or Password!!!"});
		const accessToken = sign({email: User.email, id: User.id}, process.env.JWT_SECRET);
		res.json({token: accessToken, email: email, user: User});
	})
})

route.get('/users/:id', async (req, res) => {
	const id = req.params.id;
	const User = await Users.findByPk(id, {attributes: {exclude: ['password']}});
	res.json(User);
})

route.get('/', async (req, res) => {
	const listFriend = await Users.findAll({include:[Friends]});
	// const likePost = await Likes.findAll({where: {UserId: req.user.id}});
	res.json({
		listFriend: listFriend, 
		// likePost: likePost
	})
})

module.exports = route;
