const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Users} = require('../models');

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

module.exports = route;
