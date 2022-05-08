import { Post, PostData, ApiMethodReturn } from '@customTypes/interfaces';
import { axiosInstance } from '@contexts/authContext';

class PostService {

	static mapPostData = (postData: PostData): Post => {
		return {
			id: postData._id,
			title: postData.title,
			content: postData.content,
			timestamp: postData.unixTimestamp,
			published: postData.published ?? true,
			date: new Date(postData.unixTimestamp).toLocaleDateString(),
			commentCount: postData.commentCount ?? 0,
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

	static updatePost = async (postId: string, body: { title?: string, content?: string, published?: boolean }): Promise<ApiMethodReturn> => {
		const { data } = await axiosInstance.put(`posts/${postId}`, body);
		return data?.success
			? { success: true } 
			: { success: false, errors: data?.errors };
	};

	static publishPost = async (postId: string, publish = true): Promise<ApiMethodReturn> => {
		return this.updatePost(postId, { published: publish });
	};
	
	static createPost = async (title: string, content: string): Promise<ApiMethodReturn> => {
		const { data } = await axiosInstance.post('posts', { title, content });
		return data?.success
		? { success: true } 
		: { success: false, errors: data?.errors };
	};
	
	static deletePost = async (postId: string): Promise<ApiMethodReturn> => {
		const { data } = await axiosInstance.delete<{ success: boolean, postId?: any }>(`posts/${postId}`);
		return data?.success
			? { success: true } 
			: { success: false, error: 'Failed to delete post' };
	};
}

export default PostService;