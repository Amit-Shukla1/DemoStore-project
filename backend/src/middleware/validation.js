const validateCartItem = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be at least 1",
    });
  }

  if (!Number.isInteger(quantity)) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be a whole number",
    });
  }

  next();
};

const validateSessionId = (req, res, next) => {
  const sessionId = req.headers["x-session-id"];

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: "Session ID is required in headers",
    });
  }

  req.sessionId = sessionId;
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  next();
};

module.exports = {
  validateCartItem,
  validateSessionId,
  validateEmail,
  validatePassword,
};
