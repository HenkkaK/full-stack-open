const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

describe("favorite blog", () => {
  test("returns null if given empty array", () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null);
  });

  test("when list has only one blog, returns that blog object", () => {
    const result = listHelper.favoriteBlog([helper.singleBlog]);
    assert.deepStrictEqual(result, helper.singleBlog);
  });

  test("when given multiple blogs, returns the blog object with the most likes", () => {
    const result = listHelper.favoriteBlog(helper.blogs);
    assert.deepStrictEqual(result, helper.blogs[2]);
  });
});
