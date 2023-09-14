const router = require("express").Router();
const blogPosts = require("./blog-posts-routes");
const comments = require("./comments-routes");
const users = require("./user-routes");

router.use("/blogpost", blogPosts);
router.use("/comment", comments);
router.use("/users", users);

module.exports = router;
