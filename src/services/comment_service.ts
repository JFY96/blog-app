import { Comment, CommentData, ApiMethodReturn } from '@customTypes/interfaces';
import { axiosInstance } from '@contexts/authContext';

class CommentService {

	static mapCommentData = (commentData: CommentData):Comment => {
		return {
			id: commentData._id,
			postId: commentData.post,
			name: commentData.name || 'Anonymous',
			content: commentData.content,
			timestamp: commentData.unixTimestamp,
		};
	};

	static getComments = async (postId: string):Promise<Comment[]> => {
		const { data } = await axiosInstance.get<{ success: boolean, comments: CommentData[] }>(`posts/${postId}/comments`);
		return data.comments.map(comment => this.mapCommentData(comment));
	};

	static addComment = async (postId: string, comment: string, name: string): Promise<ApiMethodReturn> => {
		const { data } = await axiosInstance.post<{ success: boolean, errors?: any, [x:string]:any }>(
			`posts/${postId}/comments`,
			{ name, content: comment }
		);
		return data?.success
			? { success: true } 
			: { success: false, errors: data?.errors };
	};
}

export default CommentService;