const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((mostLikedBlog, blog) => {
    return blog.likes > mostLikedBlog.likes ? blog : mostLikedBlog;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authorBlogs = [];
  blogs.forEach((blog) => {
    if (authorBlogs.length === 0) {
      authorBlogs.push({ author: blog.author, blogs: 1 });
    } else {
      const index = authorBlogs.findIndex(
        (elem) => elem.author === blog.author
      );
      if (index === -1) {
        authorBlogs.push({ author: blog.author, blogs: 1 });
      } else {
        authorBlogs[index].blogs = authorBlogs[index].blogs + 1;
      }
    }
  });
  return authorBlogs.reduce((mostBlogsAuthor, author) => {
    return author.blogs > mostBlogsAuthor.blogs ? author : mostBlogsAuthor;
  });
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const authorBlogs = [];
  blogs.forEach((blog) => {
    if (authorBlogs.length === 0) {
      authorBlogs.push({ author: blog.author, likes: blog.likes });
    } else {
      const index = authorBlogs.findIndex(
        (elem) => elem.author === blog.author
      );
      if (index === -1) {
        authorBlogs.push({ author: blog.author, likes: blog.likes });
      } else {
        authorBlogs[index].likes = authorBlogs[index].likes + blog.likes;
      }
    }
  });
  return authorBlogs.reduce((mostLikedAuthor, author) => {
    return author.likes > mostLikedAuthor.likes ? author : mostLikedAuthor;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
