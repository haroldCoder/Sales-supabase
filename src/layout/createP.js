import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import fs from 'fs';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast, Toaster } from 'react-hot-toast';
import { publicEncrypt } from 'crypto';

export default class CreateP extends Component{
	constructor(props){
		super(props);
		this.cookies = new Cookies();
		this.fileElem = document.getElementById("img");
		this.urlSelect = document.getElementById("urlSelect");
		this.cloudName = 'demo';
        this.unsignedUploadPreset = 'doc_codepen_example';
		global.uri = "";
		this.product = "product";
	}
	componentDidMount(){
		this.Style();
		this.getData();
	}
	componentDidUpdate(){
		this.Style();
	}
	state = {
		imgURI: "",
		name: "",
		description: "",
		price: 0,
		data: [],
		category: ""
	}
	getData = async() =>{
		const res = await axios.get('http://localhost:8000/products');
		this.setState({data: res.data});
	}
	onChangeName = (e) =>{
		this.setState({"name": e.target.value});
	}
	onChangeDescription = (e) =>{
		this.setState({"description": e.target.value});
	}
    onChangePrice = (e) =>{
		this.setState({"price": e.target.value});
	}
	onChangeCategory = (e) =>{
		this.setState({"category": e.target.value});
	}
	Submit = async(create,title,description,imgURI,price) =>{
		let id;
		if(this.state.category == ""){
			this.state.category = $(".category").val();
		}
		if(create == true)
			 if(this.state.name != "" && this.state.description != ""){
		      await axios.post('http://localhost:8000/products',{
			   name: this.state.name,
			   description: this.state.description,
			   imgURI: localStorage.getItem("uri"),
			   author: this.cookies.get("name"),
			   price: parseFloat(this.state.price).toFixed(2),
			   category: this.state.category
		      });
			  this.product = "Product Created";
			}
			  else
		        alert("Fill in all the fields");
		
		else{
			   id = this.state.data.filter(e=>{
				   if(e.name == title)
				    return e;
			   })
			   await axios.put('http://localhost:8000/products/'+id[0]._id,{
				name: this.state.name,
				description: this.state.description,
				imgURI: localStorage.getItem("uri"),
				author: this.cookies.get("name"),
				price: parseFloat(this.state.price).toFixed(2), 
				category: this.state.category
			   })
			   this.product = "Modified Product";
		}
		  this.setState({"name": ''});
		  this.setState({"description": ''});
		  $("#imgs").remove();
		  this.setState({"price": ''});
		  alert($(".category").val())
	}

	render(){
		return(
			<div className="container">
			  <div className="card create p-5">
				<div className="file d-flex" style={{flexFlow: "column"}}>
					<section className="files">
						<span class="material-icons adds">add_circle
						<input type="file" name="img" id="img" onChange={this.load}/>
						</span>
					</section>
				</div>
				<div className="card-body d-flex m-1">
				<form>
					<div class="mb-5 mt-2">
						<label for="exampleInputEmail1" className="form-label text-dark">product title</label>
						<input type="email" className="form-control cyan" id="name" aria-describedby="emailHelp" onChange={this.onChangeName} value={this.state.name}/>
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" className="form-label text-dark">product description</label>
						<input type="text" className="form-control cyan" id="description" onChange={this.onChangeDescription} value={this.state.description}/>
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" className="form-label text-dark">product price</label>
						<input type="number" className="form-control cyan" id="description" onChange={this.onChangePrice} value={this.state.price}/>
					</div>
					<div className="mb-3">
						<label className="form-label">select the category of your product</label>
						<select name="category" className='m-4 category' onChange={this.onChangeCategory} value={this.state.category}>
						    <option value="Foot">Foot</option>
							<option value="Tecnology">Tecnology</option>
							<option value="Clothes">Clothes</option>
							<option value="Tools">Tools</option>
							<option value="Pharmaceutical">Pharmaceutical</option>
						    <option value="Paraphernalia">Paraphernalia</option>
							<option value="Software">Software</option>
							<option value="Car hire">Car hire</option>
							<option value="Children">Children</option>
							<option value="Construction">Construction</option>
						</select>
					</div>
					<button className="btn btn-primary cyan" onClick={(e)=>{this.Submit(this.props.create, this.props.title); toast.success(this.product)}} style={{width: "40%"}}><i className="fa-solid fa-plus"></i></button>
					</form>
				</div>
				</div>
		  </div>
		);
	}
	Style = () =>{
		$("body").css("background","#FFF");
		$(".login").css("width","90%");
		$(".login > .container").css("width","100%");
		$(".create").css("display","flex");
		$(".create").css("flex-flow","row");
		$(".create").css("height","auto");
		$(".create").css("width","100%");
		$(".create > .card-body").css("flex-flow","column");
		$(".create > .card-body > form").css("padding","50px");
		$(".create > .card-body > input").css("height","6vh");
		$(".create").css("background","#FFF");
		$(".create > .btn").css("width","20%");
		$(".create > .btn").css("position","relative");
		$(".create > .btn").css("left","40%");
		$(".login").one("dblclick",(e)=>{
			$(".login").remove()
		})
	}

	download(filename, text) { 
		var pom = document.createElement('a');
		pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		if (document.createEvent) { 
			var event = document.createEvent('MouseEvents');
			event.initEvent('click', true, true); 
			pom.dispatchEvent(event); 
			} 
			else {
				pom.click();
			} 
			console.log(pom.getAttribute("href"))
		 }
		 click = (e) =>{
			this.fileElem.click();
		    this.uploadFile('https://res.cloudinary.com/demo/image/upload/sample.jpg')
		    e.preventDefault();
		 }
		 uploadFile = (file) =>{
			var url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			xhr.open('POST', url, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.onreadystatechange = function(e){
				 var response = JSON.parse(xhr.responseText)
			     global.url1 = response.secure_url;
			     localStorage.setItem("uri",global.url1);
			}
			fd.append('upload_preset', this.unsignedUploadPreset);
			fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
			fd.append('file', file);
			xhr.send(fd);
		}
		  load = () => {
			  let img1 = document.getElementById('img');
			  for (var i = 0; i < img1.files.length; i++) {
				this.uploadFile(img1.files[i]);
		      }
			  $(".adds").remove()
			  $(".files").append(`<img id="imgp" src=""/>`);
			  $("#imgp").attr("src",URL.createObjectURL(img1.files[0]));
			  $("#imgp").css("width","100%");
			  $("#imgp").css("height","100%");
		}
}