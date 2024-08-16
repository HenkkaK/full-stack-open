import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [blog, setBlog] = useState({ title: "", author: "", url: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog(blog);
    setBlog({ title: "", author: "", url: "" });
  };

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    const blogCopy = { ...blog };
    if (name === "title") blogCopy.title = value;
    else if (name === "author") blogCopy.author = value;
    else if (name === "url") blogCopy.url = value;
    setBlog(blogCopy);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <form onSubmit={handleSubmit}>
        {"title:  "}
        <input value={blog.title} name="title" onChange={handleBlogChange} />
        <br />
        {"author:  "}
        <input value={blog.author} name="author" onChange={handleBlogChange} />
        <br />
        {"url:  "}
        <input value={blog.url} name="url" onChange={handleBlogChange} />
        <br />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
