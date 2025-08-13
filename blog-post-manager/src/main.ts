import "./style.css";
import type { BlogPost } from "./blogpost";
import { createBlogPost } from "./blogpost";

const posts: BlogPost[] = [];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="form-container">
    <form class="form">
      <div class="row">
        <label for="title">Title</label>
        <input type="text" name="title"></input>
      </div>
      <div class="row">
        <label for="body">Body</label>
        <textarea name="body"></textarea>
      </div>
      <div class="row">
        <label for="author">Author</label>
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

  const title = (formData.get("title") as string).trim();
  const body = (formData.get("body") as string).trim();
  const author = (formData.get("author") as string).trim();

  if (!title || !body || !author) {
    alert("All fields are required.");
    return;
  }

  const post: BlogPost = createBlogPost(title, body, author);
  posts.unshift(post);
  render(posts);

  form.reset();
  form.querySelector<HTMLInputElement>('input[name="title"]')?.focus();
});

postsContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const article = target.closest<HTMLElement>("article");
  if (!article) return;

  if (target.closest(".delete")) {
    const index = posts.findIndex((post) => post.id === article.id);
    if (index !== -1) {
      posts.splice(index, 1);
    }

    render(posts);
  }
});

function createPostElement(post: BlogPost): HTMLElement {
  const article = document.createElement("article");
  article.className = "post";
  article.id = post.id;

  const title = document.createElement("h3");
  title.textContent = post.title;

  const metaData = document.createElement("p");
  metaData.textContent = `By: ${
    post.author
  } Posted: ${post.createdAt.toLocaleString()}`;

  const body = document.createElement("p");
  body.textContent = post.body;

  const trashButton = document.createElement("button");
  trashButton.className = "delete";
  trashButton.type = "button";
  trashButton.textContent = "🗑️";

  article.append(title, metaData, body, trashButton);
  return article;
}

function render(postList: BlogPost[]) {
  postsContainer.innerHTML = "";
  if (postList.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No posts yet";
    postsContainer.append(empty);
    return;
  }
  for (const post of postList) {
    postsContainer.append(createPostElement(post));
  }
}

render(posts);
