const JWT = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const responseJWT = await JWT.verify(token, process.env.JWT_SECRET);
    const { _id } = responseJWT;
    const responseUser = await User.findOne({ _id });
    req.user = responseUser;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
