import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const UserWidget = ({userId, picturePath}) =>{
	const [user, setUser] = useState(null);
	const {palette} = useTheme();
	const navigate = useNavigate();
	const token = useSelector(state =>state.token);
	const users = useSelector(state =>state.user);
	const dark = palette.neutral.dark;
	const medium = palette.neutral.medium;
	const main = palette.neutral.main;

	const getUser = async () =>{
		const response = await fetch(`http://localhost:3001/auth/users/${users.id}`,{
			method: 'GET',
			headers: {Authorization: `Bearer ${token}`}
		})

		const data = await response.json();
		setUser(data);
	}

	useEffect(()=>{
		getUser();
	},[])

	if(!user){
		return null;
	}

	const {
		firstName,
		lastName,
		location,
		occupation,
		viewedProfile,
		impressions
	} = user;

	return (
		<WidgetWrapper>
			<FlexBetween gap="0.5rem" pb="1.1rem" onClick={()=>navigate(`/profile/${userId}`)}>
				<FlexBetween gap="1rem">
					<UserImage image={picturePath}/>
					<Box>
						<Typography variant="h4" color={dark} fontWeight="500"
							sx={{"&:hover":{color: palette.primary.light, cursor: "pointer"}}}>
								{firstName} {lastName}
						</Typography>
						<Typography color={medium}>{}2 friends</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>
				<Divider />

				<Box p="1rem 0">
					<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
						<LocationOnOutlined fontSize="large" sx={{color:main}} />
						<Typography color={medium}>{location}</Typography>
					</Box>
					<Box display="flex" alignItems="center" gap="1rem" mb="1rem">
						<WorkOutlineOutlined fontSize="large" sx={{color:main}} />
						<Typography color={medium}>{occupation}</Typography>
					</Box>
				</Box>
				<Divider />

				<Box p="1rem 0">
					<FlexBetween mb="0.5rem">
						<Typography color={medium}>Who's viewed your profile</Typography>
						<Typography color={main} fontWeight="500">{viewedProfile}</Typography>
					</FlexBetween>
					<FlexBetween mb="0.5rem">
						<Typography color={medium}>Impressions of your post</Typography>
						<Typography color={main} fontWeight="500">{impressions}</Typography>
					</FlexBetween>
				</Box>

				<Divider />

				<Box p="1rem 0">
					<Typography color={main} fontWeight="500" fontSize="1rem" mb="1rem">
						Social Profile
					</Typography>
					<FlexBetween gap="1rem">
						<FlexBetween gap="1rem">
							<img src="../assets/linkedin.png" alt="linkedin" />
							<Box>
								<Typography color={main} fontWeight="500">
									Linkedin
								</Typography>
								<Typography color={medium}> Network Platform</Typography>
							</Box>
						</FlexBetween>
						<EditOutlined sx={{color: main}} />
					</FlexBetween>

					<FlexBetween gap="1rem" mb="0.5rem">
						<FlexBetween gap="1rem">
							<img src="../assets/twitter.png" alt="twitter" />
							<Box>
								<Typography color={main} fontWeight="500">
									Twitter
								</Typography>
								<Typography color={medium}>Social Network</Typography>
							</Box>
						</FlexBetween>
						<EditOutlined sx={{color: main}} />
					</FlexBetween>
				</Box>
		</WidgetWrapper>
	)
	
}

export default UserWidget;