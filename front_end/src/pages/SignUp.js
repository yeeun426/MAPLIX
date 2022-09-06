// src/pages/signup.js
import React from 'react';
import styles from './SignUp.module.css';
// import { Link } from 'react-router-dom';

import { useEffect, useState} from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';


const initialState = {
  email:"",
  id: "",
  pw: "",
  confirm_pw:"",  
  u_name: "",
  birth: "",
  gender: "",
  nick_name: "",
  check_id: false,
  check_nick_name: false,
};

const SignUp = () => {
  const [state, setState] = useState(initialState);
  const {email, id, pw, confirm_pw, u_name, birth, gender, nick_name, check_id, check_nick_name} = state;
  const [checked, setChecked] = useState(false);

  const history = useNavigate();

  const checkbox = (e) => {
    e.preventDefault();
    if (checked == false){
        setChecked(true)
    }else{
        setChecked(false)
    }
    console.log(checked)
  } ;

  const idCheck = (e) => {
    e.preventDefault();

    console.log(state.id);

    fetch("http://localhost:8000/api/checkid", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({id: state.id})
      })
      .then(res => res.json())
        .then(json => {
            // console.log(json);
            if(json.tf === true){		// json을 받아왔는데 .tf 값이 true면 사용가능
                console.log(email, id)

                alert("사용 가능한 ID입니다");  //알람!
                setState({
                    check_id: true,
                    email: state.email,
                    id: state.id,
                    pw: state.pw,
                    confirm_pw: state.confirm_pw,  
                    u_name: state.u_name,
                    birth: state.birth,
                    gender: state.gender,
                    nick_name: state.nick_name,
                })
                console.log(check_id, id, checked);
            }
            else {
                alert("이미 사용 중인 ID입니다.")
                setState({
                    check_id: false,
                    email: state.email,
                    pw: state.pw,
                    confirm_pw: state.confirm_pw,  
                    u_name: state.u_name,
                    birth: state.birth,
                    gender: state.gender,
                    nick_name: state.nick_name,
                })
          
            }
        })
      };  
  
  const nicknameCheck = (e) => {
    e.preventDefault();

    console.log(state.id);

    fetch("http://localhost:8000/api/checknickname", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({nick_name: state.nick_name})
        })
        .then(res => res.json())
        .then(json => {
            // console.log(json);
            if(json.tf === true){		// json을 받아왔는데 .tf 값이 true면 사용가능
                alert("사용 가능한 닉네임입니다");  //알람!
                setState({
                    check_nick_name: true,
                    check_id: true,
                    email: state.email,
                    id: state.id,
                    pw: state.pw,
                    confirm_pw: state.confirm_pw,  
                    u_name: state.u_name,
                    birth: state.birth,
                    gender: state.gender,
                    nick_name: state.nick_name
                })
            }
            else {
                alert("이미 사용 중인 닉네임입니다.")
                setState({
                    check_nick_name: false,
                    check_id: true,
                    email: state.email,
                    id: state.id,
                    pw: state.pw,
                    confirm_pw: state.confirm_pw,  
                    u_name: state.u_name,
                    birth: state.birth,
                    gender: state.gender,
                    nick_name : ""
                })
            
            }
        })
    };

    const gCheck = (e) => {
        e.preventDefault();
        console.log(gender);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

    if (check_id == false){
        setState({
            email: state.email,
            id: state.id,
            pw: state.pw,
            confirm_pw: state.confirm_pw,  
            u_name: state.u_name,
            birth: state.birth,
            gender: state.gender,
            nick_name: state.nick_name,
        });
        return alert('ID 중복 확인을 해주세요.')
    }
    if (pw !== confirm_pw){
        setState({
            email: state.email,
            id: state.id,
            pw: state.pw,
            confirm_pw: "",  
            u_name: state.u_name,
            birth: state.birth,
            gender: state.gender,
            nick_name: state.nick_name,
        });
        return alert('비밀번호를 다시 확인해주세요.')
    }
    if (gender == ''){
        setState({
            email: state.email,
            id: state.id,
            pw: state.pw,
            confirm_pw: state.confirm_pw,  
            u_name: state.u_name,
            birth: state.birth,
            gender: "",
            nick_name: state.nick_name,
        });
        return alert('성별을 선택해주세요')
    }
    if (check_nick_name == false){
        setState({
            email: state.email,
            id: state.id,
            pw: state.pw,
            confirm_pw: state.confirm_pw,  
            u_name: state.u_name,
            birth: state.birth,
            gender: state.gender,
            nick_name: state.nick_name,
        });
        return alert('닉네임 중복 확인을 해주세요.')
    }
    if (checked == false){
        setState({
            email: state.email,
            id: state.id,
            pw: state.pw,
            confirm_pw: state.confirm_pw,  
            u_name: state.u_name,
            birth: state.birth,
            gender: state.gender,
            nick_name: state.nick_name,
        });
        return alert('약관에 동의해주세요')
    }
    
    console.log(email, id, pw, u_name, birth, gender, nick_name);

    if (!email || !id || !pw || !confirm_pw || !u_name || !birth || !gender || !nick_name) {
      // toast.error("Please provide value into each input field");
    } else {
        console.log(email, id, pw, u_name, birth, gender, nick_name);
      const res = axios.post("http://localhost:8000/signup", {
        email,
        id,
        pw,
        confirm_pw,
        u_name,
        birth,
        gender,
        nick_name,
        check_id,
      })
      .then((res) => {
        setState({email:"", id: "", pw: "", confirm_pw:"", u_name: "", birth: "", gender: "", nick_name: "", check_id:false});
        alert("success!")
        document.location.href = '/login'
      })
      console.log(res);
      // .catch((err) => toast.error(err.response.data));
    setTimeout(() => history.push("/signup"), 500);
    }
  };

  return (
        <div className="SignUp">
            <div id="title">Maplix</div>
            <div className={styles.sub_txt}>하나의 아이디로 Maplix의 다양한 서비스를 이용해보세요.</div>

            <div className="signup_container">
                <form onSubmit={handleSubmit}>

                    <div className="signup_item">
                        <span>이메일</span>
                        <input type='email' placeholder='Email' name='email' value={email} onChange={handleInputChange}></input>
                    </div>

                    <div className={styles.signup_check}>
                        <div>아이디</div>
                        <div style={{display: 'flex'}}>
                            <input placeholder='ID' name='id' value={id} onChange={handleInputChange}></input>
                            <button onClick={idCheck}>중복 확인</button>
                        </div>
                    </div>

                    <div className="signup_item">
                        <div>비밀번호</div>
                        <input type='password' placeholder='Password' name='pw' value={pw} onChange={handleInputChange}></input>
                    </div>

                    <div className="signup_item">
                        <div>비밀번호 재확인</div>
                        <input type='password' placeholder='Confirm Password' name='confirm_pw' value={confirm_pw} onChange={handleInputChange}></input>
                    </div>

                    <div className="signup_item">
                        <div>이름</div>
                        <input placeholder='User Name' name='u_name' value={u_name} onChange={handleInputChange}></input>
                    </div>

                    <div className="signup_item">
                        <span>생년월일</span>
                        <input type='date' placeholder='생년월일' name='birth' value={birth} onChange={handleInputChange}></input>
                    </div>
                    
                    <div className="signup_item">
                        <span>성별</span>
                        <select name="gender" onChange={handleInputChange} value={gender} id="gender">
                            <option value='none'>선택</option>
                            <option value="woman">여</option>
                            <option value="man">남</option>
                        </select>
                        <button onClick={gCheck}>성별 확인</button>
                    </div>

                    <div className={styles.signup_check}>
                        <div>닉네임</div>
                        <div style={{display:"flex"}}>
                            <input placeholder='User Nick Name' name='nick_name' value={nick_name} onChange={handleInputChange}></input>
                            <button onClick={nicknameCheck}>중복 확인</button>
                        </div>
                    </div>
                    {/* <button onClick={nicknameCheck}>중복 확인</button> */}

                    <div className={styles.TermsOfService}>
                        <input type="checkbox" name="agree" value="yes" checked={checked} onChange={checkbox}/>
                        <span>Maplix에서 제공하는 서비스 약관에 동의합니다.</span>
                        <button>약관 보기</button>
                    </div>

                    <div>
                        <input type='submit' className={styles.btn_signup} value="가입하기"/>
                    </div>
                </form>
                <div className={styles.signup_already}>
                    이미 가입하셨다면? 
                    <Link to = "/login"><button>로그인</button></Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;