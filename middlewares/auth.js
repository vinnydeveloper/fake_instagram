module.exports = (req, res, next) => {
  // user not logged in
  if (!req.session.user) res.redirect("/login");
  // user has a session
  next();
};
