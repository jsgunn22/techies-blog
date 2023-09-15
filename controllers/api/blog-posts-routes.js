const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const allBlogPosts = await BlogPost.findAll({
      include: [{ model: Comment, include: { model: User } }, { model: User }],
    });
    res.status(200).json(allBlogPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const getBlogPost = await BlogPost.findByPk(req.params.id, {
      include: [{ model: Comment, include: { model: User } }, { model: User }],
    });

    if (!getBlogPost) {
      res.status(404).json(`No Blogpost found`);
      return;
    }

    const thisBlogPost = await getBlogPost.get({ plain: true });

    res.render("blogpost", {
      thisBlogPost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  try {
    BlogPost.create({
      blog_title: req.body.blog_title,
      blog_description: req.body.blog_description,
      blog_author: req.body.blog_author,
    });
    res.status(200).json(`Successfully created Blog Post`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const thisBlogPost = BlogPost.findByPk(req.params.id);

    if (!thisBlogPost) {
      res.status(404).json(`No Blogpost found with this ID`);
      return;
    }

    BlogPost.update(
      {
        blog_title: req.body.blog_title,
        blog_description: req.body.blog_description,
        blog_author: req.body.blog_author,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const thisBlogPost = BlogPost.findByPk(req.params.id);

  try {
    BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
  if (!thisBlogPost) {
    res.status(404).json(`No Blogpost found with this ID`);
    return;
  }
});

// adds a comment to a blog
router.post("/:id/add-comment", async (req, res) => {
  console.log(req.body.thisUser.id);
  const getThisUser = await User.findByPk(req.session.userId);

  const thisUser = await getThisUser.get({ plain: true });

  console.log(thisUser);
  try {
    const newComment = await Comment.create({
      comment_author: thisUser.id,
      comment_description: req.body.comment_description,
      blog_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
