const router = require("express").Router();
const blogPosts = require("./blog-posts-routes");
const comments = require("./comments-routes");

router.use("/blogpost", blogPosts);
router.use("/comment", comments);

module.exports = router;
