import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export class Navigation extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.Main()
	}
	render(){
		return(
		<nav className="navmain navbar navbar-expand-lg navbar-dark bg-primary">
				<div className="container-fluid">
				 <h2>hello</h2>
				</div>
          </nav>
		)
	}
	Main = () =>{
		$(".dropdown").on("click",function(){
			$(".dropdown-menu").slideToggle(300);
		})
		$(".use").css("cursor","pointer");
		$(".use").css("font-size","7vh");
		$(".use").css("color","#FFF");
		$(".use").css("margin-right","20px");
		$(".item1").click(function() {
			$(".submenu1").slideToggle(500);
		});
		$("#item").click(function() {
			$("#submenu").slideToggle(500);
		})
		$(".item3").click(function() {
			$(".submenu3").slideToggle(500);
		})
	}
}