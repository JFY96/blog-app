export interface Post {
	id: string,
	title: string,
	content: string,
	timestamp: number,
	commentCount: number,
	date: string,
	published?: boolean,
}

export interface PostData {
	_id: string,
	title: string,
	content: string,
	unixTimestamp: number,
	published?: boolean,
	[x:string]: any,
}

export interface Comment {
	id: string,
	postId: string,
	name: string,
	content: string,
	timestamp: number,
}

export interface CommentData {
	_id: string,
	post: string,
	content: string,
	unixTimestamp: number,
	[x:string]: any,
}

export interface ApiMethodReturn {
	success: boolean,
	error?: string | undefined,
	errors?: string[] | undefined,
};