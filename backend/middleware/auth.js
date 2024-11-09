import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  //next is a callback function
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login!" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
