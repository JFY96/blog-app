import { useEffect, useState } from "react";

import { Comment } from "@customTypes/interfaces";
import CommentService from "@services/comment_service";

const useComments = <T>(postId: string) => {

	const [data, setData] = useState<Comment[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>(); // cannot have typed catch variables

	const getData = async () => {
		try {
			const result = await CommentService.getComments(postId);
			setData(result);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};
	
	useEffect(() => {
		getData();
	}, []);

	const add = async (comment: string, name: string = '') => {
		try {
			const result = await CommentService.addComment(postId, comment, name);
			if (result.success) getData();
			return result;
		} catch (err) {
			setError(err);
		}
	};

	return {
		data,
		isLoading,
		error,
		add,
	};
};

export default useComments;