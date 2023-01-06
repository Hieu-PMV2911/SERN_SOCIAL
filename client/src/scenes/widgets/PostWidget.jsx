import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
		UserId,
		id,
		firstName,
		description,
		location,
		picturePath,
		lastName,
		email,
		usePicturePath
	}) => {
	const [isComments, setIsComments] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const posts = useSelector((state) => state.posts);
	const loggedInUserId = useSelector((state) => state.user.id);
	const fullName = `${firstName} ${lastName}`
	const isLiked = true;
	// const likeCount = Object.keys(likes).length;

	const { palette } = useTheme();
	const main = palette.neutral.main;
	const primary = palette.primary.main;

	// const patchLike = async () => {
	// 	const response = await fetch(`http://localhost:3001/posts/${UserId}/like`, {
	// 		method: "PATCH",
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ userId: loggedInUserId }),
	// 	});
	// 	const updatedPost = await response.json();
	// 	dispatch(setPost({ post: updatedPost }));
	// };

	return (
		<WidgetWrapper m="2rem 0">
			<Friend
				friendId={id}
				name={fullName}
				subtitle={location}
				picturePath={picturePath}
			/>
			<Typography color={main} sx={{ mt: "1rem" }}>
				{description}
			</Typography>
			{picturePath && (
			<img
				width="100%"
				height="auto"
				alt="post"
				style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
				src={usePicturePath}
			/>
			)}
			<FlexBetween mt="0.25rem">
				<FlexBetween gap="1rem">
					<FlexBetween gap="0.3rem">
						<IconButton>
						{isLiked ? (
						<FavoriteOutlined sx={{ color: primary }} />
						) : (
						<FavoriteBorderOutlined />
						)}
						</IconButton>
						<Typography>{2}</Typography>
					</FlexBetween>
			
					<FlexBetween gap="0.3rem">
					<IconButton onClick={() => setIsComments(!isComments)}>
						<ChatBubbleOutlineOutlined />
					</IconButton>
						<Typography>2
							{/* {comments.length} */}
							</Typography>
					</FlexBetween>
				</FlexBetween>
		
			<IconButton>
				<ShareOutlined />
			</IconButton>
			</FlexBetween>
				{isComments && (
				<Box mt="0.5rem">
					{/* {comments.map((comment, i) => (
						<Box key={`${name}-${i}`}>
							<Divider />
							<Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
							{comment}
							</Typography>
						</Box>
					))} */}
					<Divider />
				</Box>
			)}
		</WidgetWrapper>
	)};

export default PostWidget;