const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

describe("most blogs", () => {
  test("returns null if given empty array", () => {
    assert.strictEqual(listHelper.mostBlogs([]), null);
  });

  test("when list has only one blog, returns that blog's author and blog value of 1", () => {
    const result = listHelper.mostBlogs([helper.singleBlog]);
    assert.deepStrictEqual(result, { author: "Jane Doe", blogs: 1 });
  });

  test("when given multiple blogs, returns an object with the author with most blogs and the amount of blogs", () => {
    const result = listHelper.mostBlogs(helper.blogs);
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });
});
