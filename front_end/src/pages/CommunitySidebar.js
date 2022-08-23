import styles from "./Community.module.css";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import together from '../img/win.png';
import question from '../img/question.png';
import free from '../img/free.png';
import write from '../img/write.png';

function CommunitySidebar({setActiveCate, activeCate, setFiltered, post}){
  useEffect(() => {
    if(activeCate === "전체"){
      setFiltered(post);
      return;
    }
    const filtered = post.filter((card) => 
    card.cm_type.includes(activeCate));
    setFiltered(filtered);
  }, [activeCate])
  return(
    <div className={styles.filter_container}>
      <ol>
        <ul><button className={activeCate === "전체" ? styles.active : ""} onClick={() => setActiveCate("전체")}>전체</button></ul>
        <ul><button className={activeCate === "동행" ? styles.active : ""} onClick={() => setActiveCate("동행")}>
          <img src={together} alt = "together"/>
          동행
          </button>
        </ul>
        <ul><button className={activeCate === "질문" ? styles.active : ""} onClick={() => setActiveCate("질문")}>
          <img src={question} alt = "question"/>  
          질문
          </button>
        </ul>
        <ul><button className={activeCate === "자유" ? styles.active : ""} onClick={() => setActiveCate("자유")}>
          <img src={free} alt = "free"/>
          자유
        </button></ul>
        <ul><button className={activeCate === "글쓰기" ? styles.active : ""} onClick={() => setActiveCate("글쓰기")}>
          <img src={write} alt = "free"/>
          글쓰기
        </button></ul>
      </ol>
    </div>
  )
}

export default CommunitySidebar;