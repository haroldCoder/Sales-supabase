import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import Beginning from './components/beginning.js';
import 'bootswatch/dist/morph/bootstrap.min.css';
import App from './App';

function Render(){
  ReactDOM.render(
    <Beginning/>,
    document.getElementById('root')
  );
}
setInterval(Render,1000);

