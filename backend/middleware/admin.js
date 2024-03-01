module.exports = function (req, res, next){
  // 401 unathorized
  // 403 fobidden

  if(!req.user.isAdmin) return res.status(403)
  .send('Access denied . Admins Only')

  next();
}