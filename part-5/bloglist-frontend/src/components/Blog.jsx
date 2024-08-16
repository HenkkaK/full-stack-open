import { useEffect, useState } from "react";
import userService from "../services/users";
import PropTypes from "prop-types";

const Blog = ({ blog, currentUser, likeBlog, deleteBlog }) => {
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState(null);
  const [userMatch, setUserMatch] = useState(false);

  useEffect(() => {
    updateUser();
  }, []);

  const toggleDetails = () => {
    setDisplay(!display);
  };

  const updateUser = async () => {
    const blogUser = await userService.get(blog.user.id);
    if (!blogUser) return;
    setUser(blogUser);
    if (blogUser.username === currentUser.username) setUserMatch(true);
  };

  const handleLike = () => {
    likeBlog(blog);
  };

  const handleDelete = () => {
    deleteBlog(blog);
  };

  return (
    <div
      style={{
        borderWidth: "3px",
        borderStyle: "solid",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <p style={{ fontWeight: "bold" }}>{blog.title}</p>
          <p>{blog.author}</p>
        </div>
        <button style={{ height: "20px" }} onClick={toggleDetails}>
          {display ? "hide" : "show"}
        </button>
      </div>
      {display ? (
        <div>
          <p>{blog.url}</p>
          <>
            {`Likes: ${blog.likes}`} <button onClick={handleLike}>like</button>
          </>
          <p>{user ? user.name : null}</p>
          {userMatch ? <button onClick={handleDelete}>DELETE</button> : null}
        </div>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
