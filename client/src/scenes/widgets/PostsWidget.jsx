import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setPost } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({isProfile = false}) => {
	const dispatch = useDispatch();
	const posts = useSelector(state => state.posts);
	const user = useSelector(state => state.user);
	const token = useSelector(state => state.token);
	const getPosts = async () => {
		const response = await fetch("http://localhost:3001/post", {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		dispatch(setPosts({ posts: data }));
	};
	
	const getUserPosts = async () => {
		const response = await fetch(`http://localhost:3001/post/byId/${user.id}`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();
		dispatch(setPost({ posts: data }));
	};
	
	useEffect(() => {
		if (isProfile) {
			getUserPosts();
		} else {
			getPosts();
		}
	}, []);
	const rMap = {posts};
	const postMap = rMap.posts[0].posts;
	console.log(postMap)
	return (
		<>
			{postMap.map(
				({id,
				userId,
				firstName,
				lastName,
				description,
				location,
				picturePath,
				email,
				usePicturePath
				}) => (
				<PostWidget
				key={id}
				UserId={userId}
				name={`${firstName} ${lastName}`}
				description={description}
				location={location}
				picturePath={picturePath}
				email={email}
				usePicturePath={usePicturePath}
				/>))}
			
		</>
	);
}

export default PostsWidget;