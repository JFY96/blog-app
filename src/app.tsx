import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from '@containers/nav/nav';
import HomePage from '@pages/home-page/home-page';
import LoginPage from '@pages/login-page/login-page';
import PostPage from '@pages/post-page/post-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import AdminPage from '@pages/admin-page/admin-page';
import { useAuth } from '@contexts/authContext';
import EditPostPage from '@pages/edit-post-page/edit-post-page';

const App = () => {
	const { isAdmin, attemptedLoginOnRefresh, refreshLogin } = useAuth();
	
	useEffect(() => {
		refreshLogin();
	}, []);

	return (
		<>
			<Nav />
			<main>
			{!attemptedLoginOnRefresh
			?
				<span>Loading...</span>
			:
				<Switch>
					<Route exact path='/'>
						<HomePage />
					</Route>
					<Route exact path='/login'>
						<LoginPage />
					</Route>
					<Route path='/post/:postId'>
						<PostPage />
					</Route>
					<Route path='/new-post'>
						<EditPostPage />
					</Route>
					<Route path='/edit-post/:postId'>
						<EditPostPage />
					</Route>
					{isAdmin &&
					<Route exact path='/admin'>
						<AdminPage />
					</Route>
					}
					<Route>
						<NotFoundPage /> 
					</Route>
				</Switch>
			}
			</main>
		</>
	);
};

export default App;