const router = require("express").Router();
const { Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const thisComment = await Comment.findAll();
    res.status(200).json(thisComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
