import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './components/home';
import Example from './components/example.js';
import { About } from './components/about.js';
import { Creations } from './components/creations.js';
import Search from './components/search';
import {Toaster} from 'react-hot-toast';
import Pay from './components/pay.js';
import Categories from './components/categories.js';

const categories = new Categories();
const search = new Search();

function App() {
  return(
    <Router>
    <div className="main">
      <div className="panel">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/creations" element={<Creations/>}/>
          <Route path="/examples" element={<Example/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/*/tecnology" element={<Categories cat="tecnology"/>}/>
          <Route path="/*/foot" element={<Categories cat="foot"/>}/>
          <Route path="/*/clothes" element={<Categories cat="clothes"/>}/>
          <Route path="/*/tools" element={<Categories cat="tools"/>}/>
          <Route path="/*/paraphernalia" element={<Categories cat="pharmaceutical"/>}/>
          <Route path="/*/pharmaceutical" element={<Categories cat="pharmaceutical"/>}/>
          <Route path="/*/software" element={<Categories cat="software"/>}/>
          <Route path="/*/carhire" element={<Categories cat="carhire"/>}/>
          <Route path="/*/children" element={<Categories cat="children"/>}/>
          <Route path="/*/constructor" element={<Categories cat="contructor"/>}/>
        </Routes>
      </div>
      <Toaster position="top-center"
					reverseOrder={false}/>
    </div>
    </Router>
  );
}
$("html").css("height", "auto");
$("body").css("height", "auto");
$("#root").css("height","100%");
$(".main").css("height", "100%");

export default App;
