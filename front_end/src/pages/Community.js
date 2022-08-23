// import Navbar from "../components/Navbar";
import CommunitySidebar from './CommunitySidebar';
import CommunityCard from "../components/CommunityCard";
import styles from "./Community.module.css";

import React, { useState, useEffect } from "react";
import axios from 'axios';

import PostModal from "../components/PostModal";
import WritePost from './WritePost';

function Community(props) {

  // 데이터 가져오기
  const loadPost = async () => {
    const response = await axios.get('http://localhost:8000/api/community');
    console.log(response.data);
    // 전체 데이터가 초기 상태
    setPost(response.data);
    setFiltered(response.data)
  };
  
  // 현재상태값, 그 상태값을 갱신해주는 함수 / post 초기값 ( 빈배열 )
  const [post, setPost] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCate, setActiveCate] = useState("전체");

  const [modal, setModal] = useState(false);

  const [clickId, setClickId] = useState()
  // 컴포넌트가 렌더링 될때마다 특정 작업 실행되도록
  useEffect(()=> {
      loadPost();
    }, [] );  

  const openModal = (e) => {
    e.preventDefault();
    setClickId(Number(e.currentTarget.children[0].id));
    setModal(true);
  };

  useEffect(() => {
    console.log(clickId);
  }, [clickId]);

  return (
    <div className={styles.community_container}>
        <div className={styles.menu}>
          
          <CommunitySidebar 
            post={post} 
            setFiltered={setFiltered} 
            activeCate={activeCate}
            setActiveCate={setActiveCate}
          />
        </div>
        
        {activeCate ==="글쓰기"
        ? <WritePost/>
        :<div className={styles.card_list}>
          {filtered.map((card, index) => {
            return (
            <>
              <div onClick={openModal}>
                <CommunityCard 
                key={card.like_num} 
                card={card} 
                // onClick={openModal} 
                activePage="community"
                />
              </div>
              {modal ? 
                <PostModal card={card} onClose={setModal} clickId={clickId}/> : null}
            </>  
            );
          })}
        </div>
        }
    </div>
  );
}

export default Community;