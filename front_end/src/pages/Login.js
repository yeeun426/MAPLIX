import React from 'react';
import styles from './SignUp.module.css';
// import { Link } from 'react-router-dom';

import { useEffect, useState} from 'react';
import { useNavigate, useParams, Link, Redirect } from "react-router-dom";
import axios from 'axios';
 
const initialState = {
  id: "",
  pw: "",
};

const Login = () =>  {
    const [state, setState] = useState(initialState);
    const {id, pw} = state;
    
    const history = useNavigate();

    const onClickLogin = (e) => {
        console.log('click login')

        e.preventDefault();
    
        console.log(state.id);
    
        fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
            "Content-Type" : "application/json"
            },
            body: JSON.stringify({id: state.id})
        })
        .then(res => res.json())
            .then(json => {
                console.log(json);
                if(json.tf === false){		// json을 받아왔는데 .tf 값이 true면 사용가능
                    alert("ID를 다시 확인해주세요.");  //알람!
                    setState({
                        id: "",
                        pw: ""
                    })
                }
                else if (json.tf === true & json.pw != state.pw) {
                    alert('비밀번호를 다시 확인해주세요.');
                    setState({
                        id: state.id,
                        pw: ""
                    })
                }
                else {
                    // const res = axios.post("http://localhost:8000/", {id,pw})
                    // .then((res) => {
                        alert("로그인 성공")
                        const nick_name = json.nick_name
                        window.localStorage.setItem('nick_name', nick_name);
                        window.localStorage.setItem('id', id);
                        document.location.href = '/'
                }            
            })
            .catch()
        }
        
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setState({ ...state, [name]: value });
        };

        useEffect(() => {
            axios.get('/login')
            .then(res => console.log(res))
            .catch()
        },[])
        
    return(
        <div className="SignUp">
            <div id="titleMain">LOGIN</div>
            
            <div className="signup_container">
                <div className="signup_item">
                    <div>아이디</div>
                    <input placeholder='ID'  name='id' value={id} onChange={handleInputChange}></input>
                </div>
                {/* <button onClick={idCheck}>중복 확인</button> */}

                <div className="signup_item">
                    <div>비밀번호</div>
                    <input type='password' placeholder='Password' name='pw' value={pw} onChange={handleInputChange}></input>
                </div>

                <div className={styles.signup_already}>
                    <button className={styles.btn_signup} onClick={onClickLogin}>로그인</button>
                    <span>신규 사용자이신가요?</span>
                    <Link to = "/signup"><button>계정 만들기</button></Link>
                </div>
            </div>
        </div>
        );
    };

export default Login;