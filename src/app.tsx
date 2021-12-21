import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Nav from '@containers/nav/nav';
import HomePage from '@pages/home-page/home-page';
import LoginPage from '@pages/login-page/login-page';
import PostPage from '@pages/post-page/post-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import AdminPage from '@pages/admin-page/admin-page';
import { useAuth } from '@contexts/authContext';

const App = () => {
	const { isAdmin, refreshLogin } = useAuth();
	
	useEffect(() => {
		refreshLogin();
	}, []);

	return (
		<BrowserRouter>
			<Nav />
			<main>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/login' component={LoginPage} />
					<Route path='/post/:postId' children={<PostPage />} />
					{isAdmin &&
					<Route exact path='/admin' component={AdminPage} />
					}
					<Route component={NotFoundPage} />
				</Switch>
			</main>
		</BrowserRouter>
	);
};

export default App;