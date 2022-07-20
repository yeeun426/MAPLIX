import styles from "./Community.module.css";
import { useEffect } from "react";
import { Link } from 'react-router-dom';

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
        <ul><button className={activeCate === "동행" ? styles.active : ""} onClick={() => setActiveCate("동행")}>동행</button></ul>
        <ul><button className={activeCate === "질문" ? styles.active : ""} onClick={() => setActiveCate("질문")}>질문</button></ul>
        <ul><button className={activeCate === "자유" ? styles.active : ""} onClick={() => setActiveCate("자유")}>자유</button></ul>
        <ul><button><Link to="/community/writepost">글쓰기</Link></button></ul>

      </ol>
    </div>
  )
}

export default CommunitySidebar;
// export default function Catbtn({ name, catActive, handleSetCat }) {
//   return (
//     <button
//       className={`cat_btn hover ${catActive ? "active_btn" : null}`}
//       onClick={() => handleSetCat(name)}
//     >
//       {name}
//     </button>
//   );
// }