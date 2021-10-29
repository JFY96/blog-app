export interface Post {
	id: string,
	title: string,
	content: string,
	timestamp: number,
	commentCount: number,
}

export interface Comment {
	id: string,
	postId: string,
	name: string,
	content: string,
	timestamp: number,
}