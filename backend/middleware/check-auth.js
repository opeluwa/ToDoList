const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];   // get token from the header  header could be bearer dksdalisadaskasdjqik42irji4nwk
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);  // these tokens are directly linked to users, so we can go frorm a token to a user
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
  } catch (error) {
    res.status(401).json({message: "Authentication issue. Login and try again"})

  }
};
