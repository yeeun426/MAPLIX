
//--------------------------------------------------------------------------------------------------
import Navbar from "../components/Navbar";
import CommunitySidebar from './CommunitySidebar';
import CommunityCard from "../components/CommunityCard";
import styles from "./Community.module.css";

import React, { useState, useEffect } from "react";
import axios from 'axios';


function Community() {

  // 데이터 가져오기
  const loadPost = async () => {
    const response = await axios.get('http://localhost:8000/api/community');
    console.log(response.data);
    setPost(response.data.reverse());
    setFiltered(response.data.reverse())
  };
  
  const [post, setPost] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCate, setActiveCate] = useState("전체");

  
  useEffect(()=> {
      loadPost();
    }, [] );  

  const onClickCard = (e) => {
    const id = e.currentTarget //closest('h2').cm_num
    console.log("클릭카드", id);
    // const book = searchBooks[id]
    // dispatch(toggleActions.toggleModal(true))
    // dispatch(bookActions.getSelectedBook(book))
  }

  return (
    <div className={styles.main_container}>
        <div className={styles.menu}>
          <CommunitySidebar 
            post={post} 
            setFiltered={setFiltered} 
            activeCate={activeCate}
            setActiveCate={setActiveCate}
          />
        </div>
        
        <div className={styles.card_list}>
          {filtered.map((card, index) => {
            return <CommunityCard clickEvent={onClickCard} key={card.cm_num} card={card}/>
          })}
        </div>
    </div>
  );
}

export default Community;