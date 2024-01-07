var mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
});

schema.virtual('employees',{
    ref:'user',
    localField:'_id',
    foreignField:'department_k'
})
schema.set('toJSON',{virtuals:true});
schema.set('toObject',{virtuals:true});
schema.post('findOneAndDelete', async function (doc, next) {
    if (doc) {
        try {
            await mongoose.model('user').deleteMany({ department_k: doc._id });
            console.log('Related Users Deleted Successfully');
        } catch (error) {
            console.error('Error deleting related users:', error);
        }
    }
    next();
});

module.exports = mongoose.model('department', schema);