const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// gets all blog posts
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

// gets a blog post by id if the user is logged in
router.get("/:id", withAuth, async (req, res) => {
  try {
    const getBlogPost = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: { model: User },
          order: [["createdAt", "DSC"]],
        },
        { model: User },
      ],
    });

    if (!getBlogPost) {
      res.status(404).json(`No Blogpost found`);
      return;
    }

    const thisBlogPost = await getBlogPost.get({ plain: true });

    res.render("blogpost", {
      thisBlogPost,
      loggedIn: req.session.loggedIn,
      thisUser: req.session.userId == thisBlogPost.blog_author ? true : false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new blog post
router.post("/", async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
      blog_title: req.body.blog_title,
      blog_description: req.body.blog_description,
      blog_author: req.session.userId,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// updates a blog post by id
router.put("/update/:id", async (req, res) => {
  try {
    // checks to see if this blog post exists
    const thisBlogPost = BlogPost.findByPk(req.params.id);

    if (!thisBlogPost) {
      res.status(404).json(`No Blogpost found with this ID`);
      return;
    }

    BlogPost.update(
      {
        blog_title: req.body.blog_title,
        blog_description: req.body.blog_description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json("update successful");
  } catch (error) {
    res.status(500).json(error);
  }
});

// deletes a blog post by id
router.delete("/:id", withAuth, async (req, res) => {
  const thisBlogPost = BlogPost.findByPk(req.params.id);

  try {
    BlogPost.destroy({
      where: {
        id: req.params.id,
      },
      include: [{ model: Comment }],
    });

    res.status(200).json("Successfully deleted blogpost");
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
  // const thisUser = await getThisUser.get({ plain: true });
  try {
    const newComment = await Comment.create({
      comment_author: req.session.userId,
      comment_description: req.body.comment_description,
      blog_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
