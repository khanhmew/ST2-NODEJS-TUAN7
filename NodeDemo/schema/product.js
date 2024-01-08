var mongoose = require("mongoose");


// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    order: Number,
    isdelete: Boolean,
    category_k:[{
        type:mongoose.Schema.ObjectId,
        ref:'category'
    }]
});

productSchema.virtual('categories',{
    ref:'category',
    localField:'_id',
    foreignField:'category_k'
})

module.exports = mongoose.model('product', productSchema);
