var mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    order: Number,
    isdelete: Boolean,
    product_k:[{
        type:mongoose.Schema.ObjectId,
        ref:'product'
    }]
});


categorySchema.virtual('products',{
    ref:'product',
    localField:'_id',
    foreignField:'category_k'
})
module.exports = mongoose.model('category', categorySchema);