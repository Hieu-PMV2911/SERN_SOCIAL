import { createSlice } from "@reduxjs/toolkit";
var location =  Location
const initialState = {
	mode : "light",
	user: null,
	token : null,
	posts: []
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers:{
		setMode: (state) =>{
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setLogin: (state, action) =>{
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state, action) =>{
			state.user = null;
			state.token = null;
		},
		setFriends: (state, action) =>{
			if(state.user){
				state.user.friends = action.payload.friends;
			}else{
				console.error("user friends non-existent :(")
			}
		},
		setPosts: (state, action) =>{
			if(!location.reload()){
				state.posts = [...state.posts, action.payload.posts];
			}
		},
		setPost: (state, action) =>{
			const updatePosts = state.posts.map((post)=>{
				if(post.id === action.payload.postId) return action.payload.post;
				return post;
			});
			state.posts = updatePosts;
		}
	}
})

export const {setMode, setLogin, setLogout, setFriends, setPosts,setPost } = authSlice.actions;
export default authSlice.reducer;