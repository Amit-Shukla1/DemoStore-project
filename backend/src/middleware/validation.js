const validateCartItem = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: 'Product ID is required'
    });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be at least 1'
    });
  }

  if (!Number.isInteger(quantity)) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be a whole number'
    });
  }

  next();
};

const validateSessionId = (req, res, next) => {
  const sessionId = req.headers['x-session-id'];

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: 'Session ID is required in headers'
    });
  }

  req.sessionId = sessionId;
  next();
};

module.exports = {
  validateCartItem,
  validateSessionId
};
