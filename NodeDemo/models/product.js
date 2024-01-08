const Product = require('../schema/product');

module.exports = {
    getAllProducts:async function () {
        return Product.find({ isdelete: false })
        .sort({ order: 1 }) // Sort by order in ascending order
        .populate({ path: 'category_k', select: 'name' }) // Populate the 'categories' field with actual category documents
        .exec();
    },

    getProductById: function (id) {
        return Product.findById(id);
    },

    getProductByName: function (name) {
        return Product.findOne({ name: name });
    },

    createProduct: async function (product) {
        product.isdelete = false;
        return new Product(product).save();
    },

    updateProduct: function (productId, updateData) {
        return Product.findOneAndUpdate({ _id: productId }, updateData, { new: true });
    },

    deleteProduct: async function (productId) {
        try {
            const deletedProduct = await Product.findByIdAndUpdate(productId, { isdelete: true });
            return deletedProduct;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
    
};