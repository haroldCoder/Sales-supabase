import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Dropdown} from 'react-bootstrap';

export default class Positioning extends Component {
	componentDidMount() {
		this.Style()
	}
	render(){
		return (
		<Dropdown className="d-inline mx-2 fill">
		<Dropdown.Toggle className="text-white" id="dropdown-autoclose-true">
		   <i class="fas fa-filter"></i>
		</Dropdown.Toggle>
	
		<Dropdown.Menu>
		  <Dropdown.Item href="#">economical products (cheap)</Dropdown.Item>
		  <Dropdown.Item href="#">expensive products</Dropdown.Item>
		  <Dropdown.Item href="#">most purchased products</Dropdown.Item>
		</Dropdown.Menu>
		</Dropdown>			
		);
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