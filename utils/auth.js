// Middleware used to check if users session is still active.  If not they are redirected to the log in page
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
