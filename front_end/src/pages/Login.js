import React from 'react';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';

function Login() {
    return(
        <div className="SignUp">
            <div id="title">LOGIN</div>
            
            <div className="signup_container">
                <div className="signup_item">
                    <div>아이디</div>
                    <input placeholder='ID'></input>
                </div>

                <div className="signup_item">
                    <div>비밀번호</div>
                    <input placeholder='Password'></input>
                </div>

                <div className={styles.signup_already}>
                    <button className={styles.btn_signup}>로그인</button>
                    <span>신규 사용자이신가요?</span>
                    <Link to = "/signup"><button>계정 만들기</button></Link>
                </div>
            </div>
        </div>
        )
}

export default Login;