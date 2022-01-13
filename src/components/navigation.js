import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Access from '../layout/access.js';
import Cookies from 'universal-cookie';
import Login from './login.js';
import Search from './search';

export class Navigation extends Component{
	constructor(props){
		super(props);
		this.search = new Search();
	}
	componentDidMount(){
		this.Main()
		this.cookies  = new Cookies();
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
	user = () => {
		   $("#root").append(`<div class="login"></div>`);
		   $(".login").css("position","absolute");
		   $(".login").css("left","37%");
		   $(".login").css("top","20%");
		if(this.cookies.get("name") == undefined && this.cookies.get("email") == undefined){
		    ReactDOM.render(
		   	     <Access/>, document.querySelector(".login")
		    );
		}
		else{
			ReactDOM.render(
				<Login/>, document.querySelector(".login")
			)
		}
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