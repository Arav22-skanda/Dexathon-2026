import jwt from "jsonwebtoken";

export const requireAdmin = (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    request.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    response.status(401).json({ message: "Admin authentication required." });
  }
};
