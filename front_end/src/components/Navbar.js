import React from 'react';
import "./Navbar.css";
import { Route, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="navbar">
          <div class="navbar_upper">
            <div class="navbar_consult">
              <a href ='#/'>CONSULTATION</a>
            </div>
            <div class="navbar_ENTJ">
              <a href='#/'>ENTJ</a>
            </div>
            <div class="navbar_my">
              <li id="cart"><a href='#/'>CART</a></li>
              <li><a href='#/'>LOGIN</a></li>
            </div>
          </div>
          
          <div class="navbar_menu">
            <li><a href="#/">Search</a></li>
            <li><a href="#/">Course</a></li>
            <li><a href="#/">Recommend</a></li>
            <li><a href="#/">Community</a></li>
            <li><a href="#/">Mypage</a></li>
          </div>
      </nav>
    );
};

export default Navbar;