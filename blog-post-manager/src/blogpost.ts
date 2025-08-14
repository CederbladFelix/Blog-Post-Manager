export interface BlogPost {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: Date;
}

const idStorageKey = "nextId";
let nextId: number = Number(localStorage.getItem(idStorageKey) || "1");

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

  localStorage.setItem(idStorageKey, String(nextId));

  return post;
}
