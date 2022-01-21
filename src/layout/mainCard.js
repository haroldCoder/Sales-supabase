import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import Pay from '../components/pay.js';
import Access from '../layout/access.js';
import axios from 'axios';

class MainCard extends Component{
	constructor(props){
		super(props);
		this.cookies = new Cookies();
	}
	componentDidMount(){
		this.Style()
		this.getDataU()
		this.getDataP()
	}
	state = {
		datau: [],
		datap: []
	};
	getDataU = async() => {
		const res = await axios.get('http://localhost:8000/users');
		this.setState({datau: res.data});
	}
	getDataP = async() => {
		const res = await axios.get('http://localhost:8000/products');
		this.setState({datap: res.data});
	}
	render(){
		return(
			<div className="container window">
				<div class="card mainc" style={{width: "18rem"}}>
						<span class="material-icons close">cancel</span>
						<a id="covers" href={this.props.cover} target="_blank" style={{cursor: "grabbing"}}><img src={this.props.cover} class="card-img-top" alt={this.props.title}/></a>
					<div class="card price" style={{width: "26%"}}>
						<div className="title bg-secondary">
							<h2 className='card-title text-center'>Price</h2>
						</div>
						<div class="card-body">
							<p class="card-text d-flex">
the price of this product is: <p className='text-primary'>{this.props.price}$</p></p>
						</div>
					</div>
					<div class="card-body">
						<div className="m-2 titlem">
						    <h5 class="card-title">{this.props.title}</h5>
							<h5 className="text-primary">{this.props.author}</h5>
						</div>
						<p class="card-text text-cm">{this.props.description}</p>
						<a href="#" class="btn btn-dark buy" onClick={()=>this.PayMent(this.props.price,this.props.author, this.props.title)}>Buy</a>
					</div>
				</div>
			</div>
		);
	}
	PayMent = (price,author,name) =>{
	   if(this.cookies.get("name") == undefined && this.cookies.get("email") == undefined){
		    $("#root").append(`<div class="login"></div>`);
			$(".login").css("position","absolute");
			$(".login").css("position","absolute");
			$(".login").css("left","37%");
			$(".login").css("top","20%");
		    return(
			  ReactDOM.render(
			  <Access/>, document.querySelector(".login")
			  )
		    )
		}
		else{
			let idpay = this.state.datau.filter(e=>{
			if(e.name == author){
				return e;
			}
			})
			let idpro = this.state.datap.filter(e=>{
				console.log(e);
				if(e.name == name && e.author == author){
					return e;
				}
			})
			console.log(idpro[0]._id);
			$(".panel").append(`<div class="panelpay"></div>`);
			ReactDOM.render(
				<Pay price={price} idpay={idpay[0].idpay} idproduct={idpro[0]._id} />,
				document.querySelector(".panelpay")
			);	
			$(".panelpay").css("position","absolute");
			$(".panelpay").css("left","35%");
			$(".panelpay").css("top","13%");
			$(".panelpay").css("width","45%");
			$(".panelpay").css("height","60vh");
			$(".panelpay").addClass("bg-dark");
			$(".panelpay").dblclick(function(){
				$(".panelpay").remove();
			})
			$(".pmainc").remove();
		}
	}
	Style = () =>{
		$(".window").css("position","absolute");
		$(".window").css("left","10%");
		$(".window").css("top","8.5%");
		$(".window").css("width","80%");
		$(".window").css("height","100vh");
		$(".window").css("padding","1%");
		$(".window > .card").css("background","#000000eb");
		$(".window > .card").css("backdrop-filter","blur(6px)");
		$("#covers").css("width","36%");
		$("#covers").css("position","relative");
		$("#covers").css("left","30%");
		$("#covers").css("box-shadow","2px 2px 4px 5px #666");
		$("#covers").css("margin",".5rem");
		$(".card-img-top").css("height","50vh")
		$(".close").css("position","absolute");
		$(".close").css("left","95%");
		$(".close").css("top","1%");
		$(".close").css("font-size","40px");
		$(".close").css("cursor","pointer");
		$(".close").on("click",()=>{
			$(".pmainc").remove();
		})
		$(".buy").css("position","absolute");
		$(".buy").css("left","39%");
		$(".buy").css("top","87%");
		$(".buy").css("width","20%");
		$(".titlem").css("position","absolute");
		$(".titlem").css("top","3%");
		$(".price").css("position","absolute");
		$(".price").css("left","73%");
		$(".price").css("top","16%");
	}
}
export default MainCard;