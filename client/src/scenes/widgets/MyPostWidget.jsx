import React, { useState } from 'react'
import { EditOutlined,AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from '@mui/icons-material'
import {Box, Divider, Typography, InputBase, useTheme, Button, useMediaQuery } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import UserImage from 'components/UserImage'
import WidgetWrapper from 'components/WidgetWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import { useNavigate } from 'react-router-dom'



const MyPostWidget = () => {
	const dispatch = useDispatch();
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState("");
	const [post, setPost] = useState("");
	const {palette} = useTheme();
	const {id,email, picturePath, firstName, lastName, location} = useSelector(state => state.user);
	const token= useSelector(state => state.token);
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
	const mediumMain = palette.neutral.medium;
	const navigate = useNavigate();

	const handlePost = async () =>{
		const formData = new FormData();
		formData.append("firstName", firstName);
		formData.append("lastName", lastName);
		formData.append("UserId", id);
		formData.append("email", email);
		formData.append("description", post);
		formData.append("location", location);
		formData.append("picturePath", picturePath);
		if(image){
			formData.append("usePicturePath", image);
		}else{
			formData.append("usePicturePath", " ");
		}

		const response = await fetch(`http://localhost:3001/post/posts`,{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData
		})

		const posts = await response.json();
		dispatch(setPosts({posts}));
		setImage(null);
		setPost("");

		navigate("/")
	}

	return (
		<WidgetWrapper>
			<FlexBetween gap="1.5rem">
				<UserImage image={picturePath} />
				<InputBase placeholder="What's on your mind..."
				onChange={((e)=>setPost(e.target.value))}
				value={post}
				sx={{width:"100%", backgroundColor:palette.neutral.light, borderRadius:"2rem", padding:"1rem 2rem"}} />
			</FlexBetween>
			{isImage &&(
				<Box border={`1px solid ${mediumMain}`} borderRadius="5px" mt="1rem" p="1rem"> 
					<InputBase placeholder="What's on your url image..." onChange={(e)=>setImage(e.target.value)}
						sx={{width:"100%", backgroundColor:palette.neutral.light, borderRadius:"0.1rem", padding:"1rem 2rem"}} />
				</Box>
			)}
			<Divider sx={{margin:"1.25rem 0"}} />
			<FlexBetween>
				<FlexBetween gap="0.25rem" onClick={()=>setIsImage(!isImage)}>
					<ImageOutlined sx={{color: mediumMain}} />
					<Typography color={mediumMain} sx={{"&:hover":{cursor: "pointer", color: mediumMain}}}>
						Image
					</Typography>
				</FlexBetween>
				{isNonMobileScreens ? (
					<>
						<FlexBetween gap="0.25rem" sx={{"&:hover":{cursor: "pointer"}}}>
							<GifBoxOutlined sx={{color: mediumMain}} />
							<Typography color={mediumMain}>Clip</Typography>
						</FlexBetween>

						<FlexBetween gap="0.25rem"  sx={{"&:hover":{cursor: "pointer"}}}>
							<AttachFileOutlined sx={{color: mediumMain}} />
							<Typography color={mediumMain}>Attachment</Typography>
						</FlexBetween>

						<FlexBetween gap="0.25rem"  sx={{"&:hover":{cursor: "pointer"}}}>
							<MicOutlined sx={{color: mediumMain}} />
							<Typography color={mediumMain}>Audio</Typography>
						</FlexBetween>
					</>
				) : (
					<>
						<FlexBetween gap="0.25rem"  sx={{"&:hover":{cursor: "pointer"}}}>
							<MoreHorizOutlined sx={{color: mediumMain}} />
						</FlexBetween>
					</>
				)}

				<Button disabled={!post} onClick={handlePost} sx={{color: palette.background.alt, backgroundColor: palette.primary.main, borderRadius:"3rem",cursor: "pointer"}}>
					POST
				</Button>
			</FlexBetween>
		</WidgetWrapper>
	)
}

export default MyPostWidget