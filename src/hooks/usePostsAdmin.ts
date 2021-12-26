import { useEffect, useState } from "react";

import { Post } from "@customTypes/interfaces";
import PostService from "@services/post_service";

const usePostsAdmin = () => {
	const [data, setData] = useState<Post[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>(); // cannot have typed catch variables

	const getData = async () => {
		try {
			const result = await PostService.getPostsAll();
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

	const publish = async (postId: string, publish = true) => {
		try {
			const result = await PostService.publishPost(postId, publish);
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
		publish,
	};
};

export default usePostsAdmin;