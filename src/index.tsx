import React from 'react';
import { render } from 'react-dom';

import Routes from './routes';
import '@global/style.scss';

render(
	<React.StrictMode>
		<Routes/>
	</React.StrictMode>,
  document.getElementById('root')
);