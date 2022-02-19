const users = {};
const userses = require('../models/users.js');

users.getUsers = async(req,res)=>{
	const user = await userses.find();
    res.json(user);	
} 
users.createUsers = async(req,res)=>{
	const {name, description, imgURI, author, price, category, arrayImg} = req.body;
	const userses = new products({
              name: name,
		      description: description,
              imgURI: imgURI,
			  author: author,
			  price: price,
			  category: category,
			  arrayImg: arrayImg 
	});
	await userses.save();
	res.json("note create");
}
users.updateUsers = async(req,res)=>{
	const {name, description, imgURI, author, price, category, arrayImg} = req.body;
	await  userses.findByIdAndUpdate(req.params.id,{
		name: name,
		description: description,
		imgURI: imgURI,
		author: author,
		price: price,
		category: category,
		arrayImg: arrayImg
	})
	res.json({"id": req.params.id});
};
users.deleteUsers = async(req,res)=>{
	const {id} = req.params;
	await  userses.findByIdAndDelete(id);
	res.json("note remove");
};

module.exports = users;