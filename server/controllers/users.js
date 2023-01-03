const express = require('express')
const route = express.Router()		
const {Friends} = require('../models')
const {ValidateToken} = require('../middlewares/AuthMiddleware')

route.post('/add', ValidateToken, async (req, res) => {
	const {UserId} = req.body;

	const found = await Friends.findOne({where: {UserId : UserId}});

	if(!found) {
		await Friends.create({UserId: UserId});
		res.json({addFriends: true});
	}else{
		await Likes.destroy({
			where:{
				UserId : UserId
			}
		});
		res.json({addFriends: false});
	}
})




module.exports = route;