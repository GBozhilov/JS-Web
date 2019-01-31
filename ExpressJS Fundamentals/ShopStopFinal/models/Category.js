const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true, dropDups: true
    },
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;