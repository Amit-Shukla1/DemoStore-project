const Product = require('../models/Product');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    
    if (count === 0) {
      const products = [
        {
          name: 'Wireless Headphones',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
          description: 'Premium wireless headphones with noise cancellation',
          category: 'Electronics',
          stock: 50
        },
        {
          name: 'Smart Watch',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
          description: 'Feature-rich smartwatch with health tracking',
          category: 'Electronics',
          stock: 30
        },
        {
          name: 'Laptop Backpack',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
          description: 'Durable laptop backpack with multiple compartments',
          category: 'Accessories',
          stock: 100
        },
        {
          name: 'Portable Speaker',
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
          description: 'Waterproof Bluetooth speaker with great sound',
          category: 'Electronics',
          stock: 75
        },
        {
          name: 'Coffee Maker',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
          description: 'Automatic coffee maker with programmable settings',
          category: 'Home',
          stock: 40
        },
        {
          name: 'Running Shoes',
          price: 119.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          description: 'Comfortable running shoes with excellent grip',
          category: 'Sports',
          stock: 60
        }
      ];

      await Product.insertMany(products);
      console.log('Sample products added to database');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

module.exports = {
  getAllProducts,
  seedProducts
};
