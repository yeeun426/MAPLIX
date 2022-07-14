import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <nav className="navbar">
      <div className="navbar_upper">
        <div className="navbar_consult">
          <Link to ='/Request'>CONSULTATION</Link>
        </div>

        <div className="navbar_ENTJ">
          {/* Maplix */}
        </div>

        <div className="navbar_my">
          <li id="cart"><Link to='/mypage'>CART</Link></li>
          <li><Link to='/signup'>LOGIN</Link></li>
        </div>
      </div>
          
      <div className="navbar_menu">
        <li><Link to ="/">Search</Link></li>
        <li><Link to ="/course">Course</Link></li>
        <li><Link to ="/recommend">Recommend</Link></li>
        <li><Link to ="/community">Community</Link></li>
        <li><Link to="/mypage">Mypage</Link></li>
      </div>
    </nav>
    );
};

export default Navbar;