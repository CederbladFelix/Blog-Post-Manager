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

  const formdata = new FormData(form);

  const title = formdata.get("title") as string;
  const body = formdata.get("body") as string;
  const author = formdata.get("author") as string;

  const post = createBlogPost(title, body, author);
  posts.unshift(post);
  console.log(posts);
});
