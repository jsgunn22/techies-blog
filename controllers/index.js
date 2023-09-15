const router = require("express").Router();
const apiRoutes = require("./api");

const test = {
  greeting: "Hello World!",
  response: "Hi back!",
};

router.get("/", async (req, res) => {
  res.render("dashboard", {
    test,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
