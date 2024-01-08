const Category = require('../schema/category');

module.exports = {
    getAllCategories:async function () {
        return Category.find({ isdelete: false })
        .sort({ order: 1 })
        .populate({ path: 'product_k', select: 'name' }) 
        .exec();
    },

    getCategoryById: function (id) {
        return Category.findById(id);
    },

    getCategoryByName: function (name) {
        return Category.findOne({ name: name });
    },

    createCategory: function (category) {
        category.isdelete = false;
        return new Category(category).save();
    },

    updateCategory: function (categoryId, updateData) {
        return Category.findOneAndUpdate({ _id: categoryId }, updateData, { new: true });
    },

    deleteCategory: async function (categoryId) {
        try {
            const deletedCategory = await Category.findByIdAndUpdate(categoryId, { isdelete: true });
            return deletedCategory;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
