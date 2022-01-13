import React, {Component} from 'react';

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
}