/* eslint-disable */
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Link } from "react-router-dom";

function App() {
  const onChange = (e) => {
    console.log(e.target.value);
  }
  return (
    <div className="App">
      <Navbar />
      <div className='Main_Search'>
        <li><a id="title">Maplix</a></li>
        <li><a>영화, 드라마, 예능을 보면서 가고 싶은 곳을 지금 바로 찾아보세요!</a></li>

        <div className='Search_Category'>
          <li><a>title</a></li>
          <li><a>area</a></li>
        </div>
  
        <input 
          onChange={onChange}
          placeholder="Search"
        />
        
      </div>
    </div>
  );
}

export default App;
