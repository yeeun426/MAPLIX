// src/pages/signup.js
import React from 'react';
import styles from './SignUp.module.css';
// import { Link } from 'react-router-dom';

import { useEffect, useState} from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';


const initialState = {
  id: "",
  pw: "",
  u_name: "",
  birth: "",
  gender: "",
  nick_name: "",
  email:"",
  confirm_pw:"",  
};

const SignUp = () => {
  const [state, setState] = useState(initialState);
//   const [img, setImg] = useState({gender: ""});

  const {id, pw, u_name, birth, gender, nick_name, email, confirm_pw} = state;
//   const {gender} = img;

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // const gender = img;
    // formData.append('file', img);
    // console.log(gender);
    // console.log(formData);
    
    if (!id || !pw || !u_name || !birth || !gender || !nick_name || !email || !confirm_pw) {
      // toast.error("Please provide value into each input field");
    } else {
      const res = axios.post("http://localhost:8000/community/writepost", {
        id,
        pw,
        u_name,
        birth,
        gender,
        nick_name,
        email,
        confirm_pw
        // formData
      })
      .then((res) => {
        setState({id: "", pw: "", u_name: "", birth: "", gender: "", nick_name: "", email: "", confirm_pw: ""});
        // setImg({gender: ""});
        alert("success!")
      })
      console.log(res);
      // .catch((err) => toast.error(err.response.data));
    setTimeout(() => history.push("/signup"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
        <div className="SignUp">
            <div id="title">Maplix</div>
            <div className={styles.sub_txt}>하나의 아이디로 Maplix의 다양한 서비스를 이용해보세요.</div>
            
            <div className="signup_container">
                <div className="signup_item">
                    <span>이메일</span>
                    <input type='email' placeholder='Email' name='email' value={email} onChange={handleInputChange}></input>
                </div>

                <div className="signup_item">
                    <div>아이디</div>
                    <input placeholder='ID' name='id' value={id} onChange={handleInputChange}></input>
                </div>

                <div className="signup_item">
                    <div>비밀번호</div>
                    <input type='password' placeholder='Password' name='pw' value={pw} onChange={handleInputChange}></input>
                </div>

                <div className="signup_item">
                    <div>비밀번호 재확인</div>
                    <input type='password' placeholder='Confirm Password' name='confrim_pw' value={confirm_pw} onChange={handleInputChange}></input>
                </div>

                <div className="signup_item">
                    <div>이름</div>
                    <input placeholder='User Name' name='u_name' value={u_name} onChange={handleInputChange}></input>
                </div>

                <div className="signup_item">
                    <span>생년월일</span>
                    <input type='date' placeholder='생년월일' name='email' value={email} onChange={handleInputChange}></input>
                </div>
                
                <div className="signup_item">
                    <span>성별</span>
                    <input type='radio' name='gender' value={'woman'} onChange={handleInputChange}>여</input>
                    <input type='radio' name='gender' value={'man'} onChange={handleInputChange}>남</input>
                </div>
                
                <div className={styles.TermsOfService}>
                    <input type="checkbox" name="agree" value="yes"/>
                    <span>Maplix에서 제공하는 서비스 약관에 동의합니다.</span>
                    <button>약관 보기</button>
                </div>

                <div>
                    <button className={styles.btn_signup} onSubmit={handleSubmit}>가입하기</button>
                </div>

                <div className={styles.signup_already}>
                    이미 가입하셨다면? 
                    <Link to = "/login"><button>로그인</button></Link>
                </div>

            </div>
        </div>
    );
}

export default SignUp;