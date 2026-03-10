// middleware/roleMiddleware.js

export const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
  };
};

//  Role-specific helpers
export const adminOnly = roleMiddleware("admin");
export const userOnly = roleMiddleware("user");
