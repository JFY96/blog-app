import { useEffect, useState, useRef } from "react";

import { Post } from "@customTypes/interfaces";
import PostService from "@services/post_service";

const usePostsAdmin = () => {
	const isMounted = useRef<Boolean | null>(null);

	const [data, setData] = useState<Post[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>(); // cannot have typed catch variables

	const getData = async () => {
		try {
			const result = await PostService.getPostsAll();
			if (isMounted.current) setData(result);
		} catch (err) {
			if (isMounted.current) setError(err);
		} finally {
			if (isMounted.current) setIsLoading(false);
		}
	};

	useEffect(() => {
		isMounted.current = true; // executed when mounted
		return () => { isMounted.current = false; }; // executed when unmount
	}, []);

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

	const remove = async (postId: string) => {
		try {
			const result = await PostService.deletePost(postId);
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
		remove,
	};
};

export default usePostsAdmin;