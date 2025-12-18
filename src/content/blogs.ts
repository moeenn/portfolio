class Tag {
    constructor(
        public readonly name: string
    ) { }
}

const Tags: Record<string, Tag> = {
    js: new Tag("JavaScript"),
}

export class BlogPost {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly desc: string,
        public readonly date: string,
        public readonly tags: Tag[],
    ) { }
}

export const BlogPosts: BlogPost[] = [
    {
        id: "javascript-large-numbers",
        title: "Large numbers in JavaScript",
        desc: "Guide on how to handle large numbers in JavaScript.",
        date: "2025-12-10",
        tags: [Tags.js]
    }
]