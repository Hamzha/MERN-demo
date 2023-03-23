module.exports = async (req, res, next) => {
  const { user } = req;
  if (user.admin) {
    return next();
  }

  return res.status(403).json({ error: 'Permission Denied' });
};
