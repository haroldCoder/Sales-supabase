const notesctrl = {};
const products = require('../models/products.js');

notesctrl.getproducts = async(req,res)=>{
	const product = await products.find();
    res.json(product);	
} 
notesctrl.createproducts = async(req,res)=>{
	const {name, description, imgURI, author, price, category} = req.body;
	const product = new products({
              name: name,
		      description: description,
              imgURI: imgURI,
			  author: author,
			  price: price,
			  category: category
	});
	await product.save();
	res.json("note create");
}
notesctrl.updateproducts = async(req,res)=>{
	const {name, description, imgURI, author, price, category} = req.body;
	await products.findByIdAndUpdate(req.params.id,{
		name: name,
		description: description,
		imgURI: imgURI,
		author: author,
		price: price,
		category: category
	})
	res.json({"id": req.params.id});
};
notesctrl.deleteproducts = async(req,res)=>{
	const {id} = req.params;
	await products.findByIdAndDelete(id);
	res.json("note remove");
};

module.exports = notesctrl;