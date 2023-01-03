const {verify} = require('jsonwebtoken')

const ValidateToken = (req, res, next) => {
	const accessToken = req.header("accessToken");

	if(!accessToken){
		return res.json({errors:"User not logged in"});
	}

	try{
		const verifyToken = verify(accessToken, process.env.JWT_SECRET);
		req.user = verifyToken;
		if(verifyToken){
			return next();
		}
	}catch(err){
		return res.json({error: err});
	}

}

module.exports = {ValidateToken}