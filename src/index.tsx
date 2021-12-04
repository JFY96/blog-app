import React from 'react';
import { render } from 'react-dom';

import App from './app';
import '@global/root.scss';
import { AuthProvider } from '@contexts/authContext';

render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
  document.getElementById('root')
);