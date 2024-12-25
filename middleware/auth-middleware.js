const jwt = require('jsonwebtoken')


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']
  console.log(authHeader)
  console.log("auth middleware is called");
  const token = authHeader && authHeader.split(" ")[1]
  try {
    const decodedTokenInfo = jwt.verify(token,process.env.JWT_SECRET_KEY)
    console.log(decodedTokenInfo)
    req.userInfo = decodedTokenInfo
    next()
  } catch (e) {
    return res.status(500).json({
        success:false,
        message:"Access denied"
    })
  }
  if(!token){
    return res.status(401).json({
      sucess: false,
      message: "Access denied. No token",
    });
  }
};

module.exports = authMiddleware;
