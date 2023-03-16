
module.exports = async (req, res, next) => {
  const user = req.user;
  if (user.admin) {
    return next();
  }
  else {
    return res.status(403).json({ error: "Permission Denied" });

  }
};
