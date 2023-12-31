const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// creates new user account
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    });
    const thisNewUser = await User.findOne({
      where: { email: req.body.email },
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = thisNewUser.id;

      res
        .status(200)
        .json({ user: newUser, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Checks users credentials and sets session
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password. Please try again" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// used to log the user out
router.post("/logout", withAuth, (req, res) => {
  // When the user logs out, destroy the session
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
