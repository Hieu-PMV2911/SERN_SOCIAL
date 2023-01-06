module.exports = (sequelize, DataTypes) => {
	const Posts = sequelize.define('Posts',{ 
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
		description: {
			type:DataTypes.STRING,
			allowNull: false
		},
		location: {
			type:DataTypes.STRING,
			allowNull: false
		},
		picturePath: {
			type:DataTypes.STRING,
			allowNull: false
		},
		usePicturePath: {
			type:DataTypes.STRING,
			allowNull: false
		},
	})

	Posts.associate = (models) =>{
		Posts.hasMany(models.Likes,{
			onDelete: 'cascade'
		});
		Posts.hasMany(models.Comments,{
			onDelete: 'cascade'
		});
	}

	return Posts;
}