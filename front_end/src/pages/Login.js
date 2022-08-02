import React from 'react';
import styles from './SignUp.module.css';
// import { Link } from 'react-router-dom';

import { useEffect, useState} from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';


const initialState = {
  id: "",
  pw: "",
};

const Login = () =>  {
    const [state, setState] = useState(initialState);
    const {id, pw} = state;
    
    const history = useNavigate();

    const idCheck = (e) => {
        e.preventDefault();
    
        console.log(state.id);
    
        fetch("http://localhost:8000/login", {
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
                    alert("ID 를 다시 확인해주세요.");  //알람!
                    setState({
                        // check_id: true,
                        id: "",
                        pw: ""
                    })
                    // console.log(check_id, id, checked);
                }
                else if (json.pw != state.pw) {
                    alert('비밀번호를 다시 확인해주세요.');
                    setState({
                        id: state.id,
                        pw: ""
                    })
                }
                else {
                    alert("success!")
                    setState({
                        id: state.id,
                        pw: state.pw
                        // check_id: false
                    })
            
                }
            })
        };  
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // if (check_id == false){
        //     return alert('ID 중복 확인을 해주세요.')
        // }
        // if (pw !== confirm_pw){
        //     return alert('비밀번호를 다시 확인해주세요.')
        // }
        
        console.log(id, pw);
    
        if (!id || !pw ) {
        // toast.error("Please provide value into each input field");
        } else {
            console.log(id, pw);
        const res = axios.post("http://localhost:8000/login", {
            id,
            pw
        })
        .then((res) => {
            setState({id: "", pw: ""});
            alert("success!")
        })
        console.log(res);
        // .catch((err) => toast.error(err.response.data));
        setTimeout(() => history.push("/login"), 500);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    
    return(
        <div className="SignUp">
            <div id="title">LOGIN</div>
            
            <div className="signup_container">
                <div className="signup_item">
                    <div>아이디</div>
                    <input placeholder='ID'  name='id' value={id} onChange={handleInputChange}></input>
                </div>
                <button onClick={idCheck}>중복 확인</button>

                <div className="signup_item">
                    <div>비밀번호</div>
                    <input type='password' placeholder='Password' name='pw' value={pw} onChange={handleInputChange}></input>
                </div>

                <div className={styles.signup_already}>
                    <button className={styles.btn_signup} onClick={handleSubmit}>로그인</button>
                    <span>신규 사용자이신가요?</span>
                    <Link to = "/signup"><button>계정 만들기</button></Link>
                </div>
            </div>
        </div>
        )
}

export default Login;