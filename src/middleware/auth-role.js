module.exports = {

  authRole (userType) {
    return (req, res, next) => {
      if(req.user.type !== userType) {
        res.status(401)
        return res.send('No permission')
      }
      next()
    }
    //todo: test

  }

}