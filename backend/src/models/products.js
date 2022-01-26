const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;

const product = new mongoose.Schema({
    "name": {type: String, required: true, unique: false},
    "description": {type: String, required: true, unique: false},
    "imgURI": {type: String,required: true, unique: false},
    "author": {type: String, required: true, unique: false},
    "price": {type: Object, required: true, unique: false},
    "category": {type: String, required: true, unique: false}
})

module.exports = mongoose.model("products",product);