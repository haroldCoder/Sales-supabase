import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import google from '../img/google.ico'
import Cookies from 'universal-cookie';
import {toast,Toaster} from 'react-hot-toast';
import axios from 'axios';
import App from '../App';

class Access extends Component{
	constructor(props) {
		super(props);
		this.cookie = new Cookies();
	}
	state = {
		data: [],
		email: '',
		password: ''
	}
	componentDidMount() {
		$(".acces").css("background","#003d54");
		$(".acces").css("width","60vh");
		$(".acces").css("height","65vh");
		$(".acces").css("padding","19px");
		$(".acces > form > footer > .btn-primary").css("width","100%");
		$(".acces > form > footer > .btn-primary").css("border-radius","20px");
		$(".acces > form > footer").css("position","relative");
		$(".acces > form > footer").css("top","10vh");
		$(".acces > form > footer > .btn-primary").css("height","46px");
		$(".acces > form > footer > .btn-primary").css("margin-bottom","5%");
		$(".login").css("width","55vh");
		$(".login").css("padding","5px")
		$(".rem").css("position","sticky");
		$(".rem").css("left","100%");
		$(".rem").css("cursor","pointer");
		$(".rem").on("click",function(){
			$(".login").remove();
			$(".log").remove();
		})
		this.getData()
	}
	getData = async() =>{
		const res = await axios.get('http://localhost:8000/users');
		this.setState({data: res.data});
	}
	onChangeEmail = (e) =>{
		this.setState({email: e.target.value});
	}
	onChangePassword = (e) =>{
		this.setState({password: e.target.value});
	}
    onSubmit = (e) =>{
		if(this.state.email != '' && this.state.password != '')
			this.cookie.set("name", this.state.email.split(0,1).toString(), { path: '/' });
			this.cookie.set("email", this.state.email, { path: '/' });
            let pos, i = 0;
			let b = 'F';

			while(i < this.state.data.length){
				if(this.state.data[i].email == this.state.email){
					pos = i;
					b = 'V';
				}
				i++;
			}
			if(b == 'V'){
				alert("logged in");
			}
			else{
				axios.post('http://localhost:8000/users',{
						"name": this.state.email.split(0,1).toString(),
						"email": this.state.email,
				});
			}
		this.setState({email: ''});
		this.setState({password: ''});
		$(".login").remove()
		$(".log").remove()
		e.preventDefault()
	}
	render(){
		return (
		  <div className="acces container">
			<span className="material-icons rem">highlight_off</span>
		    <form>
			<div class="mb-3">
				<label for="exampleInputEmail1" class="form-label">Email address</label>
				<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeEmail} value={this.state.email}/>
			</div>
			<div class="mb-3">
				<label for="exampleInputPassword1" class="form-label">Password</label>
				<input type="password" class="form-control" id="exampleInputPassword1" onChange={this.onChangePassword} value={this.state.password}/>
			</div>
			<footer>
			<button type="submit" onClick={this.onSubmit} class="btn-primary">LOGIN</button>
			<GoogleLogin
				clientId="709295496820-5vr1gvn7iskih8ccrjji5vc0ijq5pant.apps.googleusercontent.com"
				render={(renderProps) => (
				<button className="login" onClick={renderProps.onClick}
			    disabled={renderProps.disabled}><img src={google}/></button>
				)}
				buttonText="Login"
				onSuccess={(e)=>this.responseGoogle(e,this.props.render)}
				onFailure={(e)=>this.responseGoogle(e,this.props.render)}
				cookiePolicy={'single_host_origin'}
			/>
			<Toaster/>
			</footer>
			</form>
		  </div>
		);	
	}
	responseGoogle = (res,render) =>{
		this.cookie.set("name", res.profileObj.name, { path: '/' });
		this.cookie.set("email", res.profileObj.email, { path: '/' });
		this.cookie.set("imageurl", res.profileObj.imageUrl, { path: '/' });
		let pos, i = 0;
		let b = 'F';

		while(i < this.state.data.length){
			if(this.state.data[i].name == res.profileObj.name){
				pos = i;
				b = 'V';
			}
			i++;
		}
		if(b == 'V'){
			alert("logged in");
		}
		else{
			axios.post('http://localhost:8000/users',{
				"name": this.cookie.get("name"),
				"email": this.cookie.get("email"),
				"imageurl": this.cookie.get("imageurl")
	        });
		}
		$(".login").remove()
		$(".log").remove()	
		ReactDOM.render(
			<App/>,
			document.querySelector("#root")
		);
		if(render){
			window.location.reload();
		}
	}
}
export default Access;