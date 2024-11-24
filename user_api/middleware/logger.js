const userLogger = (req, res, next) => {
    console.log(`[User API] ${req.method} ${req.url}`);
    next();
  };
  
  module.exports = userLogger;
  