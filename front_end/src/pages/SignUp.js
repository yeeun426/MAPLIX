import React from 'react';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';

function SignUp() {
    return(
        <div className="SignUp">
            <div id="title">Maplix</div>
            <div className={styles.sub_txt}>하나의 아이디로 Maplix의 다양한 서비스를 이용해보세요.</div>
            
            <div className="signup_container">
                <div className="signup_item">
                    <div>아이디</div>
                    <input placeholder='ID'></input>
                </div>

                <div className="signup_item">
                    <div>비밀번호</div>
                    <input placeholder='Password'></input>
                </div>

                <div className="signup_item">
                    <div>비밀번호 재확인</div>
                    <input placeholder='Confirm Password'></input>
                </div>

                <div className="signup_item">
                    <div>이름</div>
                    <input placeholder='User Name'></input>
                </div>

                <div className="signup_item">
                    <span>이메일</span>
                    <input placeholder='Email'></input>
                </div>

                <div className={styles.TermsOfService}>
                    <input type="checkbox" name="agree" value="yes"/>
                    <span>Maplix에서 제공하는 서비스 약관에 동의합니다.</span>
                    <button>약관 보기</button>
                </div>

                <div>
                    <button className={styles.btn_signup}>가입하기</button>
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