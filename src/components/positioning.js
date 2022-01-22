import React, {Component, useEffect} from 'react';
import ReactDOM, { render } from 'react-dom';
import $ from 'jquery';
import {Dropdown} from 'react-bootstrap';
import axios from 'axios';
import Card from '../layout/card';

class Positioning extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.getData();
		this.render();
		this.Style()
	}
	componentDidUpdate(){
		this.getData()
	}
	state = {
		data: []
	}
	getData = async() =>{
		const res = await axios.get("http://localhost:8000/products");
		this.setState({data: res.data});
	}
	render(){
		return (
			<Dropdown className="d-inline mx-2 fill">
			<Dropdown.Toggle className="text-white" id="dropdown-autoclose-true">
			<i class="fas fa-filter"></i>
			</Dropdown.Toggle>
		
			<Dropdown.Menu>
			<Dropdown.Item href="#" id="proec" onClick={()=>this.AlgoritmCheap()}>economical products (cheap)</Dropdown.Item>
			<Dropdown.Item href="#" id="proex" onClick={()=>this.AlgoritmExpensive()}>expensive products</Dropdown.Item>
			<Dropdown.Item href="#">most purchased products</Dropdown.Item>
			<Dropdown.Item href="#" onClick={()=>this.RealProducts()}>all products</Dropdown.Item>
		</Dropdown.Menu>
		</Dropdown>			
		)
	}
	AlgoritmExpensive = () =>{
		let fil = this.state.data.map(e=>{
			return e;
		})
		for(let i = 0; i<fil.length-1; i++){
			for(let j = 0; j<fil.length-i-1; j++){
				if(fil[j].price < fil[j+1].price){
					let temp = fil[j];
					fil[j] = fil[j+1];
					fil[j+1] = temp;
				}
			}
		}
		ReactDOM.render(
			<>
			    {
			        fil.map(e=>(
			        	<Card title={e.name} description={e.description} imgURI={e.imgURI} author={e.author} price={e.price}/>
			        ))
			    }			
			</>, document.querySelector(".cont")
		)
	}
	AlgoritmCheap = () =>{
		let fil = this.state.data.map(e=>{
			return e;
		})
		for(let i = 0; i<fil.length-1; i++){
			for(let j = 0; j<fil.length-i-1; j++){
				if(fil[j].price > fil[j+1].price){
					let temp = fil[j];
					fil[j] = fil[j+1];
					fil[j+1] = temp;
				}
			}
		}
		ReactDOM.render(
			<>
			    {
			        fil.map(e=>(
			        	<Card title={e.name} description={e.description} imgURI={e.imgURI} author={e.author} price={e.price}/>
			        ))
			    }			
			</>, document.querySelector(".containe > .cont")
		)
	}
	RealProducts = () =>{
		ReactDOM.render(
			<>
			    {
			        this.state.data.map(e=>(
			        	<Card title={e.name} description={e.description} imgURI={e.imgURI} author={e.author} price={e.price}/>
			        ))
			    }			
			</>, document.querySelector(".cont")
		)
	}
	Style = () =>{
		$(".fill").css("z-index","4")
		$(".fill").css("position","fixed");
		$(".fill").css("left","92%");
		$(".fill").css("top","12%");
		$(".fill > #dropdown-autoclose-true").css("border-radius","8px");
		$("#dropdown-autoclose-true").css("background","#388DFC99")
	}
}
export default Positioning;