import { Post, PostData, ApiMethodReturn } from '@customTypes/interfaces';
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
		return this.getPosts('posts?admin=true');
	};

	static getPosts = async (resource = 'posts'): Promise<Post[]> => {
		const { data } = await axiosInstance.get<{ success: boolean, posts:PostData[] }>(resource);
		if (data.success) return data.posts.map(postData => this.mapPostData(postData));
		else return [];
	};

	static getPost = async (postId: string): Promise<Post | undefined> => {
		if (!postId) return;
		const { data } = await axiosInstance.get<{ success: boolean, post: PostData }>(`posts/${postId}`);
		return this.mapPostData(data.post);
	};

	// TODO post the returning type out into export?
	static updatePost = async (postId: string, body: { content?: string, published?: boolean }): Promise<ApiMethodReturn> => {
		const { data } = await axiosInstance.put(`posts/${postId}`, body);
		return data?.success
			? { success: true } 
			: { success: false, errors: data?.errors };
	};

	static publishPost = async (postId: string, publish = true): Promise<ApiMethodReturn> => {
		return this.updatePost(postId, { published: publish });
	};
	
}

export default PostService;