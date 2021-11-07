import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/cyborg/bootstrap.min.css';
import { Navigation } from './navigation';
import $ from 'jquery';

export class Home extends Component{
	componentDidMount(){
		$(".main > .panel").css("height","100vh");
	}
	render(){
		return(
			<div className="main">
				<Navigation/>
				<div className="panel container">

				</div>
			</div>
		)
	}
}