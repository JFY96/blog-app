import React, { useContext, useState } from 'react';

import { Button, TextField } from '@components';
import formStyles from '@global/formStyle.scss';
import containerStyles from '@global/styles.scss';
import { useAuth } from '@contexts/authContext';

const styles = { ...formStyles, ...containerStyles };

const LoginPage = () => {
	const { loggedIn, username, userLogin } = useAuth();

	const [ name, setName ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('');
	const [ error, setError ] = useState<string>('');

	const loginUser = async () => {
		const result = await userLogin(name, password);
		if (result.error) setError(result.error);
		else {
			setName('');
			setPassword('');
			setError('');
			// redirect ? TODO
		}
	}

	return (
		<div className={styles['main-content']}>
			<div className={styles['column-content-container']}>
				<div className={styles.container}>
					{loggedIn
					?
						<h1>Welcome back, {username}</h1>
					:
						<>
						<div className={styles.title}>Log In</div>
						<label className={styles.label}>Username</label>
						<TextField 
							text={name}
							onChange={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.currentTarget.value)}
						/>
						<label className={styles.label}>Password</label>
						<TextField 
							text={password}
							fieldType='password'
							onChange={(event:React.ChangeEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)}
						/>
						<div className={styles.buttonContainer}>
							<span className={error ? styles.error : styles.success}>
								{error}
							</span>
							<Button type='button'
								text='Log In'
								onClick={loginUser}
							/>
						</div>
						</>
					}
				</div>
			</div>
		</div>
	);
};

export default LoginPage;