module.exports = (req, res, next) => {
 if(req.role === 'admin') {
  next();
 } else {
  res.status(401).send('Not authenticated.')
 }
}