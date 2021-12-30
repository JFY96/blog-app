import React from 'react';

import Post from '@containers/post/post';
import useFetch from '@hooks/useFetch';
import PostService from '@services/post_service';
import styles from '@global/styles.scss';

const HomePage = () => {

	const { data, isLoading, error } = useFetch(() => PostService.getPosts('posts?includeCount=true'));

	return (
		<div className={styles['main-content']}>
			<div className={styles['column-content-container']}>
				{isLoading 
				? 'Loading . . .'
				: error
				? 'Failed to retrieve posts'
				: (data ?? []).map(post => <Post key={`POST_${post.id}`} post={post} preview={true} />)
				}
			</div>
		</div>
	);
};

export default HomePage;