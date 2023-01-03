module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users',{ 
		firstName: {
			type:DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type:DataTypes.STRING,
			allowNull: false
		},
		email: {
			type:DataTypes.STRING,
			allowNull: false
		},
		password: {
			type:DataTypes.STRING,
			allowNull: false
		},
		picturePath: {
			type:DataTypes.STRING,
			allowNull: false
		},
		location: {
			type:DataTypes.STRING,
			allowNull: false
		},
		occupation: {
			type:DataTypes.STRING,
			allowNull: false
		},
		viewedProfile: {
			type:DataTypes.STRING,
			allowNull: false
		},
		impressions: {
			type:DataTypes.STRING,
			allowNull: false
		},
	})

	Users.associate = (models) =>{
		Users.hasMany(models.Friends,{
			onDelete: 'cascade'
	});

	// 	Users.hasMany(models.Post,{
	// 		onDelete: 'cascade'
	// 	})
	}

	return Users;
}