import "./style.css";
import type { BlogPost } from "./blogpost";
import { createBlogPost } from "./blogpost";

const posts: BlogPost[] = [];
const postsStorageKey: string = "blogposts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `

  <header>
    <h1>Blog</h1>
  </header>
  <main>
    <div class="form-container">
      <form class="form">
        <h2>Post</h2>
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
  </main>

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
  savePosts(posts);
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
      savePosts(posts);
    }
    render(posts);
  }

  if (target.closest(".edit")) {
    const index = posts.findIndex((post) => post.id === article.id);
    if (index === -1) return;

    const postIsBeingEdited = !!article.querySelector("textarea");

    if (postIsBeingEdited) {
      exitEditMode(posts[index], article);
    } else {
      enterEditMode(article);
    }
  }
});

function savePosts(posts: BlogPost[]) {
  localStorage.setItem(postsStorageKey, JSON.stringify(posts));
}

function getStoragePosts(): BlogPost[] {
  try {
    const rawJSONString = localStorage.getItem(postsStorageKey);
    if (!rawJSONString) return [];

    const blogPostArrayDateAsString = JSON.parse(rawJSONString) as Array<
      Omit<BlogPost, "createdAt"> & { createdAt: string }
    >;
    return blogPostArrayDateAsString
      .map((p) => ({ ...p, createdAt: new Date(p.createdAt) }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.log("Error: " + error);
    return [];
  }
}

function enterEditMode(article: HTMLElement) {
  const p = article.querySelector<HTMLParagraphElement>(".body")!;
  const textArea = document.createElement("textarea");
  textArea.value = p.textContent;
  textArea.name = "body";
  textArea.className = p.className;

  article.replaceChild(textArea, p);

  const editButton = article.querySelector<HTMLButtonElement>(".edit")!;
  editButton.textContent = "✅";
}

function exitEditMode(post: BlogPost, article: HTMLElement) {
  const textarea = article.querySelector<HTMLTextAreaElement>("textarea");
  if (!textarea) return;

  post.body = textarea.value;
  savePosts(posts);

  const p = document.createElement("p");
  p.textContent = textarea.value;
  p.className = textarea.className;

  article.replaceChild(p, textarea);

  const editButton = article.querySelector<HTMLButtonElement>(".edit")!;
  editButton.textContent = "✏️";
}

function createPostElement(post: BlogPost): HTMLElement {
  const article = document.createElement("article");
  article.className = "post";
  article.id = post.id;

  const title = document.createElement("h3");
  title.textContent = post.title;

  const metaData = document.createElement("p");
  metaData.className = "meta";
  metaData.textContent = `${post.author} ${post.createdAt.toLocaleString()}`;

  const body = document.createElement("p");
  body.className = "body";
  body.textContent = post.body;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.type = "button";
  editButton.textContent = "✏️";

  const trashButton = document.createElement("button");
  trashButton.className = "delete";
  trashButton.type = "button";
  trashButton.textContent = "🗑️";

  buttonContainer.append(editButton, trashButton);

  article.append(title, metaData, body, buttonContainer);
  return article;
}

function render(posts: BlogPost[]) {
  postsContainer.innerHTML = "";
  if (posts.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No posts yet";
    postsContainer.append(empty);
    return;
  }
  for (const post of posts) {
    postsContainer.append(createPostElement(post));
  }
}

posts.push(...getStoragePosts());
render(posts);
