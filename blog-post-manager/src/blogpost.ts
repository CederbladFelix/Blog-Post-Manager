export interface BlogPost {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: Date;
}

let nextId: number = 1;

export function createBlogPost(
  title: string,
  body: string,
  author: string
): BlogPost {
  return {
    id: (nextId++).toString(),
    title,
    body,
    author,
    createdAt: new Date(),
  };
}
