import "./style.css";
import type { BlogPost } from "./blogpost";
import { createBlogPost } from "./blogpost";

const posts: BlogPost[] = [];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="form-container">
    <form class="form">
      <div class="row">
        <label>Title</label>
        <input type="text" name="title"></input>
      </div>
      <div class="row">
        <label>Body</label>
        <textarea name="body"></textarea>
      </div>
      <div class="row">
        <label>Author</label>
        <input type="text" name="author"></input>
      </div>
      <div>
        <button type="submit" class="submit">Submit</button>
      </div>
    </form>
  </div>
  <div id="blogposts">
  </div>
`;

const form = document.querySelector<HTMLFormElement>(".form")!;
const postsContainer = document.querySelector<HTMLDivElement>("#blogposts")!;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const author = formData.get("author") as string;

  const post = createBlogPost(title, body, author);
  posts.unshift(post);
  render(posts);
});

function createPostElement(post: BlogPost): HTMLElement {
  const article = document.createElement("article");
  article.className = "post";

  const title = document.createElement("h3");
  title.textContent = post.title;

  const metaData = document.createElement("p");
  metaData.textContent = `By: ${
    post.author
  } Posted: ${post.createdAt.toLocaleString()}`;

  const body = document.createElement("p");
  body.textContent = post.body;

  article.append(title, metaData, body);
  return article;
}

function render(list: BlogPost[]) {
  postsContainer.innerHTML = "";
  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No posts yet.";
    postsContainer.append(empty);
    return;
  }
  for (const p of list) {
    postsContainer.append(createPostElement(p));
  }
}
