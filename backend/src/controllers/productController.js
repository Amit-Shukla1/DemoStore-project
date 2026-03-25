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
        name: 'Portable Speaker',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        description: 'Waterproof Bluetooth speaker with great sound',
        category: 'Electronics',
        stock: 75
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
        name: 'Sunglasses',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        description: 'Polarized UV400 sunglasses with a sleek, lightweight frame',
        category: 'Accessories',
        stock: 90
      },
      {
        name: 'Leather Wallet',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
        description: 'Slim genuine leather wallet with multiple card slots',
        category: 'Accessories',
        stock: 120
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
        name: 'Air Purifier',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500',
        description: 'HEPA air purifier that removes 99.97% of airborne particles',
        category: 'Home',
        stock: 35
      },
      {
        name: 'Desk Lamp',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
        description: 'LED desk lamp with adjustable brightness and USB charging port',
        category: 'Home',
        stock: 55
      },
      {
        name: 'Running Shoes',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        description: 'Comfortable running shoes with excellent grip',
        category: 'Sports',
        stock: 60
      },
      {
        name: 'Yoga Mat',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1601925228269-8b06a3e3deca?w=500',
        description: 'Non-slip yoga mat with alignment lines, perfect for home workouts',
        category: 'Sports',
        stock: 80
      },
      {
        name: 'Dumbbell Set',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
        description: 'Adjustable dumbbell set ideal for strength training at home',
        category: 'Sports',
        stock: 45
      }
    ];

    // Delete all existing products and re-insert the latest list
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products synced to latest list');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

module.exports = {
  getAllProducts,
  seedProducts
};
