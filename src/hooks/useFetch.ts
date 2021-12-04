import { useEffect, useState } from "react";

const useFetch = <T>(fetchMethod: () => Promise<T>) => {
	const [data, setData] = useState<T>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>(); // cannot have typed catch variables

	useEffect(() => {
		const getData = async () => {
			try {
				const result = await fetchMethod();
				setData(result);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};
		getData();
	}, []);

	return {
		data,
		isLoading,
		error,
	};
};

export default useFetch;