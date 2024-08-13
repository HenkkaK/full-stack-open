const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

describe("most likes", () => {
  test("returns null if given empty array", () => {
    assert.strictEqual(listHelper.mostLikes([]), null);
  });

  test("when list has only one blog, returns that blog's author and number of likes", () => {
    const result = listHelper.mostLikes([helper.singleBlog]);
    assert.deepStrictEqual(result, { author: "Jane Doe", likes: 15 });
  });

  test("when given multiple blogs, returns an object with the author with most likes and the total likes", () => {
    const result = listHelper.mostLikes(helper.blogs);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
  });
});
