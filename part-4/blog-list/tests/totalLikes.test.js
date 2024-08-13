const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes([helper.singleBlog]);
    assert.strictEqual(result, 15);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(helper.blogs);
    assert.strictEqual(result, 36);
  });
});
