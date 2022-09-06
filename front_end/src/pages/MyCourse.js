// src/pages/Subscription.js
import Layout from '../components/Layout';
import styles from "./Community.module.css";
import MyCourseCard from "..//components/MyCourseCard";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Modal from "../components/PostModal";
import Navbar from "../components/Navbar";

function MyCourse() {

  const id = window.localStorage.getItem("id");

  // 데이터 가져오기
  const loadPost = async () => {
    const response = await axios.post('http://localhost:8000/api/mycourse', {id});
    console.log(response.data);
    // 전체 데이터가 초기 상태
    setPost(response.data);
    //setFiltered(response.data)
  };
  
  // 현재상태값, 그 상태값을 갱신해주는 함수 / post 초기값 ( 빈배열 )
  const [post, setPost] = useState([]);
  //const [filtered, setFiltered] = useState([]);
  //const [activeCate, setActiveCate] = useState("전체");

  const [modal, setModal] = useState(false);
  

  // 컴포넌트가 렌더링 될때마다 특정 작업 실행되도록
  useEffect(()=> {
      loadPost();
    }, [] );  

  return (
    <>
     {modal === true ? <Modal open={Modal} closeModal={() => {setModal(false);}} /> : null}
    <div className={styles.main_container}>
      <Layout activeMenu="mypage">
      <div className={styles.title_like}>
        내 경로
      </div>

      <div className={styles.like_list}>
        {post.map((card, index) => {
          return (
            
            <div>
            {/* div onClick={() => console.log("커뮤니티에서", card.cm_num)}> */}
            <MyCourseCard key={card.mc_num} card={card} 
                          openModal={ () => setModal(true)} />
            
            {/* 모달 이걸로해보기 */}
            {/* https://github.com/marinakim44/mern-img-modal/blob/master/client/src/App.js */}
            </div>
          );
        })}
      </div>
      
      </Layout>
    </div>
    </>
  );
}

export default MyCourse;