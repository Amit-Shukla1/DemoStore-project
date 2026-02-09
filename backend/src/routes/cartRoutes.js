const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart
} = require('../controllers/cartController');
const { validateCartItem, validateSessionId } = require('../middleware/validation');

router.use(validateSessionId);

router.post('/', validateCartItem, addToCart);
router.get('/', getCart);
router.put('/', validateCartItem, updateCartItem);
router.delete('/:productId', removeFromCart);

module.exports = router;
