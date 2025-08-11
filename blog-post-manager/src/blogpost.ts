export interface BlogPost {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: Date;
}

let nextId = 1;

export function createBlogPost(
  title: string,
  body: string,
  author: string
): BlogPost {
  return {
    id: nextId++,
    title,
    body,
    author,
    createdAt: new Date(),
  };
}
