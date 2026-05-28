const jwt = require("jsonwebtoken");

const ensureAuthenticatedUser = (req, res, next)=>{
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json({message: "UnAuthorized, JWT token is required"}) }

    const tokenSeparated = token.split(" ")[1];
try{
  const decodedToken = jwt.verify(tokenSeparated, process.env.JWT_SECRET);
  req.user = decodedToken;
  next();
}catch(err){
  return res.status(401).json({message: "Unauthorized, JWT token is wrong or expired"});
}
}

module.exports = ensureAuthenticatedUser;