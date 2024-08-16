import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    if (!user) return;
    updateBlogs();
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const setError = (error) => {
    setErrorMessage(error.message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const setSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const updateBlogs = async () => {
    try {
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes));
    } catch (err) {
      setError(err);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (err) {
      setError(err);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.create(newBlog);
      updateBlogs();
      setSuccess(`Added Blog, ${newBlog.title}`);
    } catch (err) {
      setError(err);
    }
  };

  const increaseBlogLikes = async (blog) => {
    const updatedBlog = { ...blog };
    updatedBlog.likes = blog.likes + 1;
    updatedBlog.user = blog.user.id;
    await blogService.update(blog.id, updatedBlog);
    updateBlogs();
  };

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog '${blog.title} by ${blog.author}'?`))
      return;
    await blogService.deleteBlog(blog.id);
    updateBlogs();
  };

  return (
    <div>
      <h2>{user ? "Blogs" : "log in to application"}</h2>
      <Notification
        message={errorMessage ?? successMessage}
        error={!!errorMessage}
      />
      {user ? (
        <>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogOut}>Logout</button>
          <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <div style={{ marginTop: "30px" }}>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                currentUser={user}
                likeBlog={increaseBlogLikes}
                deleteBlog={deleteBlog}
              />
            ))}
          </div>
        </>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
