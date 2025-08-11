import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="form-container">
    <form class="form">
      <div class="row">
        <label>Title</label>
        <input></input>
      </div>
      <div class="row">
        <label>Body</label>
        <textarea></textarea>
      </div>
      <div class="row">
        <label>Author</label>
        <input></input>
      </div>
      <div>
        <button class="submit">Submit</button>
      </div>
    </form>
  </div>
  <div>
    <p>Blogposts here</p>
  </div>
`;
