import React from 'react';

import Post from '@containers/post/post';
import { postExamples as posts } from '@services/post_service';

const HomePage = () => {
	return (
		<div className='main-content'>
			<div className='column-content-container'>
				{posts.map(post => <Post post={post} preview={true} />)}
			</div>
		</div>
	);
};

export default HomePage;