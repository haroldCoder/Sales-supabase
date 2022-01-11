import React, {Component, useState} from 'react';
import ReactDOM, { render } from 'react-dom';
import $ from 'jquery';
import masterCard from '../img/mastercard.jpg';
import paypal from '../img/paypal.png';
import nequi from '../img/nequi.jpg';
import efecty from '../img/Efecty.jpg';
import axios from 'axios';
import Pay from './pay.js';
import Cookies from 'universal-cookie';

export default class EditAdvance extends Component {
	constructor(props) {
		super(props);
		this.price = 300;
		this.name = "";
		this.cookie = new Cookies();
		this.id = 0;
	}
	componentDidMount() {
		this.Style()
		this.getData()
	}
	state = {
		number: 0,
		ID: '',
		data: [],
		name: '',
	};
	getData = async() =>{
		const res = await axios.get('http://localhost:8000/users');
		this.setState({data: res.data});
	}
	onChangeNumber = (e) =>{
		this.setState({number: e.target.value});
	}
	onChangeID = (e) =>{
		this.setState({ID: e.target.value});
	}
	render(){
		this.name = this.props.author;
		return (
			<div className="container">
				<div class="card bg-primary">
				<h5 class="card-header bg-dark">Modified Advanced</h5>
				<div class="card-body">
				<form>
					<legend className="text-light">add information about us</legend>
					<div class="mb-3">
					<label for="disabledTextInput" class="form-label text-light">number for whatsapp</label><br/>
					<input type="tel" id="phone" class="form-control" onChange={this.onChangeNumber} name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required style={{width: "20%"}}/>
					</div>
					<div className="pay mb-4">
						<label className="text-light mb-3">ID of Stripe</label>
						<div className="d-flex justify-content-between align-content-center">
							<input type="text" className="form-control" style={{width: "40%"}} onChange={this.onChangeID} />
							<a className="text-light" target="_blank" href="https://dashboard.stripe.com/">Stripe login o sing up</a>
						</div>
					</div>
					<textarea className="form-control mt-2" id="w3review" name="w3review" rows="4" cols="50">Write more information valuable</textarea>
				<footer className="foot d-flex justify-content-center">
					<button class="btn btn-primary" onClick={this.submitInfo}>Accept</button>
				</footer>
				</form>
				</div>
				</div>
			</div>
		);
	}
	submitInfo = () =>{
		this.id = this.state.data.filter(e=>{
			   if(e.name == this.name) 
			      return e;
		});
			axios.put('http://localhost:8000/users/'+this.id[0]._id,{
			   name: this.name,
			   email: this.id[0].email,
			   number: this.state.number,
			   idpay: this.state.ID
		    });
			this.cookie.set('idpay', this.state.ID);
		$(".panelEA").remove();
	}
	Style = () =>{
		$(".modified").remove()
		$(".panelEA").css("position","absolute");
		$(".panelEA").css("top","15%");
		$(".panelEA").css("left","20%");
		$(".panelEA > .container > .card").css("height","87vh");
		$(".panelEA").css("width","70%");
		$(".foot").css("position","sticky");
		$(".foot").css("top","90%");
		$("form").css("height","100%");
		$(".itempay").css("width","16%");
		$(".itempay").css("height","80px");
		$(".itempay").css("cursor","pointer");
		$(".panelEA").dblclick(()=>{
			$(".panelEA").remove();
		})
	}
}