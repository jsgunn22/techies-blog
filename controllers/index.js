const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");
const apiRoutes = require("./api");

router.get("/", async (req, res) => {
  const getAllBlogPosts = await BlogPost.findAll({
    include: [{ model: Comment }, { model: User }],
  }).catch((err) => res.json(err));

  const blogPosts = getAllBlogPosts.map((blog) => blog.get({ plain: true }));
  res.render("home", {
    blogPosts,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.use("/api", apiRoutes);

module.exports = router;
