const router = require("express").Router();
const { BlogPost, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allBlogPosts = await BlogPost.findAll({
      include: [{ model: Comment }],
    });
    res.status(200).json(allBlogPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const thisBlogPost = await BlogPost.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    if (!thisBlogPost) {
      res.status(404).json(`No Blogpost found`);
      return;
    }
    res.status(200).json(thisBlogPost);
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

module.exports = router;
