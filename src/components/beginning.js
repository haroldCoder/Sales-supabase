import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import fire from '../img/fire.png';

export class Beginning extends Component{
	render(){
		return(
			<div className="App">
               <header className="App-header">
                 <img src={fire} className="App-logo" alt="logo" />
                 <p>
                   WELCOME TO KODERX SALES.
                 </p>
                 <a className="App-link" href="https://briefcase-coderx.herokuapp.com/" target="_blank" rel="noopener noreferrer">Briefcase Coderx</a>
               </header>
           </div>
		)
	}
}