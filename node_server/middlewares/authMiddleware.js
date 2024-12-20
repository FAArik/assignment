import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkeymysecret";

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

export default authenticationMiddleware;