import { Post, PostData } from '@customTypes/interfaces';
import { axiosInstance } from '@contexts/authContext';

class PostService {
	/*
	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	*/
	static mapPostData = (postData: PostData): Post => {
		return {
			id: postData._id,
			title: postData.title,
			content: postData.content,
			timestamp: postData.unixTimestamp,
			published: postData.published ?? true,
			date: new Date(postData.unixTimestamp).toLocaleDateString(),
			commentCount: 0, // TODO
		};
	};

	static getPostsAll = async (): Promise<Post[]> => {
		return this.getPosts('posts?admin=true'); // hnmm express doesn't seem to recognise this?
	};

	static getPosts = async (resource = 'posts'): Promise<Post[]> => {
		const { data } = await axiosInstance.get<{ success: boolean, posts:PostData[] }>(resource);
		if (data.success) return data.posts.map(postData => this.mapPostData(postData));
		else return [];
	};

	static getPost = async (postId: string): Promise<Post> => {
		const { data } = await axiosInstance.get<{ success: boolean, post: PostData }>(`posts/${postId}`);
		return this.mapPostData(data.post);
	};
	
}

export default PostService;