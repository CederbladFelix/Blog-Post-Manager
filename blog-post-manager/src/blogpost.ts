export interface BlogPost {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: Date;
}

let nextId: number = Number(localStorage.getItem("nextId") || "1");

export function createBlogPost(
  title: string,
  body: string,
  author: string
): BlogPost {
  const post: BlogPost = {
    id: (nextId++).toString(),
    title,
    body,
    author,
    createdAt: new Date(),
  };

  localStorage.setItem("nextId", String(nextId));

  return post;
}
