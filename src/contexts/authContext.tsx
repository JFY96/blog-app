import React, { useState, useEffect, useRef, useContext } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module 'axios' {
	export interface AxiosRequestConfig {
		retry?: boolean,
	}
}

interface AuthProviderProps {
	children: React.ReactChild,
};

interface AuthContextValue {
	loggedIn: boolean,
	username: string,
	userId: string,
	isAdmin: boolean,
	attemptedLoginOnRefresh: boolean,
	userLogin: (username: string, password: string) => any,
	refreshLogin: () => any,
	userLogout: () => any,
};

type loginResponse = {
	success: boolean,
	error?: string,
	user?: string,
	userId?: string,
	token?: string,
	admin?: boolean,
};

type logoutResponse = {
	success: boolean,
	error?: string,
};

const axiosInstance = axios.create({
	baseURL: process.env.BLOG_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'credentials': 'include',
	},
	withCredentials: true,
});

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const accessTokenRef = useRef<string>();
	const [attemptedLoginOnRefresh, setAttemptedLoginOnRefresh] = useState<boolean>(false); // Used to know when 'refreshLogin' was called (first login on refresh)
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [username, setUsername] = useState<string>('');
	const [userId, setUserId] = useState<string>('');
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const loginPost = async (path: string, username?: string, password?: string): Promise<{ success: boolean, error: string }> => {
		let error = '';
		try {
			const body = (username && password) ? { username, password } : undefined;
			const result = await axiosInstance.post<loginResponse>(path, body);
			if (result.data.success) {
				// set login, token
				setLoggedIn(true);
				setUsername(result.data?.user ?? '');
				setUserId(result.data?.userId ?? '');
				setIsAdmin(result.data?.admin ?? false);
				accessTokenRef.current = result.data?.token ?? '';
			} else {
				error = result.data?.error ?? '';
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				error = err?.response?.data?.error ?? 'An error occurred during login';
			}
		} finally {
			return {
				success: error === '',
				error,
			};
		}
	};
	
	const userLogin = async (username: string, password: string) => {
		return loginPost('auth/login', username, password);
	};
	
	const refreshLogin = async () => {
		const loginResult = await loginPost('auth/refresh_token');
		setAttemptedLoginOnRefresh(true);
		return loginResult;
	};

	const userLogout = async () => {
		let error = '';
		try {
			const result = await axiosInstance.post<logoutResponse>('auth/logout');
			if (result.data.success) {
				// reset login, token
				setLoggedIn(false);
				setUsername('');
				setUserId('');
				setIsAdmin(false);
				accessTokenRef.current = '';
			} else {
				error = result.data?.error ?? '';
			}
		} catch(err) {
			if (axios.isAxiosError(err)) {
				error = err?.response?.data?.error ?? 'An error occurred during logout';
			}
		} finally {
			return {
				success: error === '',
				error,
			};
		}
	};

	useEffect(() => {
		axiosInstance.interceptors.request.use(
			(config: AxiosRequestConfig): AxiosRequestConfig => {
				if (!config.headers) config.headers = {};
				config.headers['Authorization'] = `Bearer ${accessTokenRef.current}`;
				return config;
			},
			(error: AxiosError): Promise<AxiosError> => {
				return Promise.reject(error);
			}
		);
		
		axiosInstance.interceptors.response.use(
			(res: AxiosResponse): AxiosResponse => {
				return res;
			},
			async (err: AxiosError): Promise<any> => {
				const originalConfig = err.config;
		
				if (originalConfig.url && !['auth/login', 'auth/refresh_token'].includes(originalConfig.url) && err.response) {
					if (err.response.status === 401 && !originalConfig.retry) {
						originalConfig.retry = true; // prevent infinite loop
						try {
							const { success } = await refreshLogin();
							return axiosInstance(originalConfig);
						} catch (error) {
							return Promise.reject(error);
						}
					}
				}
		
				return Promise.reject(err);
			}
		);
	}, []);

	return (
		<AuthContext.Provider value={{
			loggedIn,
			username,
			userId,
			isAdmin,
			attemptedLoginOnRefresh,
			userLogin,
			refreshLogin,
			userLogout,
		}}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) { // undefined check for TypeScript
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}

export { AuthProvider, useAuth, axiosInstance };