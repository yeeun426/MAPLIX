import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import logo from '../img/logo.JPG';

function Navbar() {
  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
      sessionStorage.removeItem('nick_names')
      // App 으로 이동(새로고침)
      document.location.href = '/'
  }
  return (
    <nav className="navbar">
      <div className="navbar_upper">
        <div className="navbar_consult">
          <Link to ='/'><img src={logo} alt = "logo" style={{height: "30px", position:"fixed", top: "20px"}}/></Link>
        </div>

        <div className="navbar_ENTJ">
          {/* Maplix */}
        </div>

        <div className="navbar_my">
          
          <button type='button' onClick={onLogout}>Logout</button>
          <li>{window.localStorage.getItem("nick_name")} 님</li>

          <li><Link to ='/Request'>CONSULTATION</Link></li>
          <li id="cart"><Link to='/mypage'>CART</Link></li>
          <li><Link to='/login'>LOGIN</Link></li>
          
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