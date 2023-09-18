const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");
const apiRoutes = require("./api");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const getAllBlogPosts = await BlogPost.findAll({
    include: [{ model: Comment }, { model: User }],
  }).catch((err) => res.json(err));

  const blogPosts = getAllBlogPosts.map((blog) => blog.get({ plain: true }));

  let test = blogPosts.length == 0 ? false : true;

  console.log(test);

  res.render("home", {
    blogPosts,
    loggedIn: req.session.loggedIn,
    isBlogs: blogPosts.length == 0 ? false : true,
  });
});

// my dashboard - renders all of current session users blogs
router.get("/dashboard", withAuth, async (req, res) => {
  const getMyBlogs = await BlogPost.findAll({
    include: [{ model: User }, { model: Comment }],
    where: {
      blog_author: req.session.userId,
    },
  });

  const blogPosts = await getMyBlogs.map((blog) => blog.get({ plain: true }));

  res.render("dashboard", {
    blogPosts,
    loggedIn: req.session.loggedIn,
    isBlogs: blogPosts.length == 0 ? false : true,
  });
});

// render the create blog post page
router.get("/create-new", (req, res) => {
  res.render("create-blog");
});

router.get("/update/:id", withAuth, async (req, res) => {
  const getThisBlog = await BlogPost.findByPk(req.params.id);

  const thisBlogPost = await getThisBlog.get({ plain: true });

  res.render("update", { thisBlogPost });
});

// gets the log in page
router.get("/login", async (req, res) => {
  res.render("login");
});

router.use("/api", apiRoutes);

module.exports = router;
