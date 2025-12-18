class Tag {
	constructor(public readonly name: string) {}
}

class Category {
	constructor(public readonly name: string) {}
}

const Categories: Record<string, Category> = {
	js: new Category("Javascript"),
};

const Tags: Record<string, Tag> = {
	largeNumbers: new Tag("Large numbers"),
	node: new Tag("Node"),
	npm: new Tag("NPM"),
	ts: new Tag("Typescript"),
	jsdoc: new Tag("JSDoc"),
	express: new Tag("Express"),
	jwt: new Tag("JWT"),
};

export class BlogPost {
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly desc: string,
		public readonly category: Category,
		public readonly tags: Tag[],
	) {}
}

export const BlogPosts: BlogPost[] = [
	{
		id: "javascript-large-numbers",
		title: "Large numbers in JavaScript",
		desc: "Handling large numbers in an interpreted language like Javascript can be tricky. Here are some tips for working with them more effectively.",
		category: Categories.js,
		tags: [Tags.largeNumbers],
	},
	{
		id: "npm-workspaces",
		title: "NPM Workspaces",
		desc: "NPM workspaces is a mechanism for sharing code between different Javascript projects. This article walks through workspaces setup and configuration.",
		category: Categories.js,
		tags: [Tags.npm, Tags.node],
	},
	{
		id: "jsdoc",
		title: "JSDoc for type-hints",
		desc: "Plain Javascript projects without any sort of type-checking can be hell. Here is how to take of advantages of Typescript in plain Javascript projects.",
		category: Categories.js,
		tags: [Tags.jsdoc, Tags.ts],
	},
	{
		id: "node-memory-leaks",
		title: "Detect memory leaks in NodeJS applications",
		desc: "Bad code is not only hard to maintain, it can also be hard on the running it. This articles gives a general idea of how to detect memory leaks in a NodeJs/Express application.",
		category: Categories.js,
		tags: [Tags.node, Tags.express],
	},
	{
		id: "node-jwt",
		title: "JWT in Node",
		desc: "JWTs are a great alternative to sessions and cookies. This article walks through usage of JWTs in NodeJS.",
		category: Categories.js,
		tags: [Tags.node, Tags.jwt, Tags.jsdoc],
	},
	{
		id: "pm2-clustering",
		title: "Clustering and PM2 in Node",
		desc: "Given the single-threaded nature of Node, clustering is extremely important to ensure resiliance and proper utilization of hardware. This articles walks through some examples.",
		category: Categories.js,
		tags: [Tags.node],
	},
];
