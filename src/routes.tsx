import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Nav from '@containers/nav/nav';
import HomePage from '@pages/home-page/home-page';
import LoginPage from '@pages/login-page/login-page';
import PostPage from '@pages/post-page/post-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';

const Routes = () => {
	return (
		<BrowserRouter>
			<Nav />
			<main>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/login' component={LoginPage} />
					<Route path='/post/:postId' children={<PostPage />} />
					<Route component={NotFoundPage} />
				</Switch>
			</main>
		</BrowserRouter>
	);
};

export default Routes;