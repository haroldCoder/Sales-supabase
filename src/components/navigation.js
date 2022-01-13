import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router-dom';


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
					<a className="navbar-brand" href="#">Sales</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarColor01">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
						<Link className="nav-link active" to="/">Home
							<span className="visually-hidden">(current)</span>
						</Link>
						</li>
						<li className="nav-item">
						<Link className="nav-link" to="/creations">Creations</Link>
						</li>
						<li className="nav-item">
						<Link className="nav-link" to="/about">About</Link>
						</li>
						<li className="nav-item item1">
						<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Products</a>
						<div className="dropdown-menu submenu1">
							<Link className="dropdown-item" id="onl" to="/">products online</Link>
							<Link className="dropdown-item" id="exa" to="/examples">product examples</Link>
						</div>
						</li>
						<li className="nav-item" id="item">
						<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Category</a>
						<div className="dropdown-menu" id="submenu">
							<Link className="dropdown-item" to="/*/foot">Foot</Link>
							<Link className="dropdown-item" to="/*/tecnology">Tecnology</Link>
							<Link className="dropdown-item" to="/*/clothes">Clothes</Link>
							<Link className="dropdown-item" to="/*/tools">Tools</Link>
							<Link className="dropdown-item" to="/*/pharmaceutical">Pharmaceutical</Link>
						    <Link className="dropdown-item" to="/*/paraphernalia">Paraphernalia</Link>
							<Link className="dropdown-item" to="/*/software">Software</Link>
							<Link className="dropdown-item" to="/*/car hire">Car hire</Link>
							<Link className="dropdown-item" to="/*/children">Children</Link>
							<Link className="dropdown-item" to="/*/construction">Construction</Link>
						</div>
						</li>
						<li className="nav-item item3">
							<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">settings</a>
							<div className="dropdown-menu submenu3">
								<p className="bg-secondary">mode</p>
								<button className="dropdown-item bg-dark" onClick={() =>{$("body").removeClass("bg-secondary"); $("body").addClass("bg-dark"); $(".card").addClass("bg-dark")}}>mode dark</button>
								<button className="dropdown-item bg-light" onClick={()=>{$("body").removeClass("bg-dark"); $("body").css("background","#d9e3f1");  $(".card").removeClass("bg-dark")}}>mode light</button>
							</div>
						</li>
					</ul>
					<form className="d-flex">
					<span class="material-icons use" onClick={this.user}>account_circle</span>
					<input class="form-control me-sm-2" type="text" placeholder="search by name" />
                    <button class="btn btn-secondary my-2 my-sm-0" onClick={this.search.submitData}>Search</button>
					</form>
					</div>
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