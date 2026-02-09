const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const sessionId = req.sessionId;

    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({
        sessionId,
        items: [],
        totalAmount: 0
      });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.totalAmount = await calculateTotal(cart.items);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: populatedCart
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const sessionId = req.sessionId;

    let cart = await Cart.findOne({ sessionId }).populate('items.productId');

    if (!cart) {
      cart = new Cart({
        sessionId,
        items: [],
        totalAmount: 0
      });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const sessionId = req.sessionId;

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      const product = await Product.findById(productId);
      
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock available'
        });
      }

      cart.items[itemIndex].quantity = quantity;
    }

    cart.totalAmount = await calculateTotal(cart.items);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: populatedCart
    });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const sessionId = req.sessionId;

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    cart.totalAmount = await calculateTotal(cart.items);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: populatedCart
    });
  } catch (error) {
    next(error);
  }
};

const calculateTotal = async (items) => {
  let total = 0;
  
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  
  return Math.round(total * 100) / 100;
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart
};
