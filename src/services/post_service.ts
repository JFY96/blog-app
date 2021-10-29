import { Post, Comment } from '@customTypes/interfaces';

// Use fake examples for now
export const postExamples:Array<Post> = [
	{
		id: '1',
		title: 'Lorem ipsum dolor sit amet',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		timestamp: 1635010009000,
		commentCount: 0,
	},
	{
		id: '2',
		title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		timestamp: 1635010009000,
		commentCount: 27,
	},
	{
		id: '3',
		title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		timestamp: 1635010009000,
		commentCount: 3,
	},
];

export const commentExamples:Array<Comment> = [
	{
		id: '1',
		postId: '1',
		name: 'Tom',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		timestamp: 1635010009000,
	},
	{
		id: '2',
		postId: '1',
		name: 'Tom',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		timestamp: 1635010009000,
	},
	{
		id: '3',
		postId: '1',
		name: 'Tom',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		timestamp: 1635010009000,
	},
	{
		id: '4',
		postId: '1',
		name: 'Tom',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		timestamp: 1635010009000,
	},
];