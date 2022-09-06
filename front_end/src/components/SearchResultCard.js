// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";
import React, { useState }from "react";
import axios from "axios";
import { MdBookmarkBorder } from "react-icons/md";
// import { MdBookmark } from "react-icons/md"; 

export default function SearchResultCard({card}) {

  const id = window.localStorage.getItem("id");
  const l_num = card.l_num;
  const [detail, setDetail] = useState(false); 
  
  const onClickPlace =(e)=> {
      // setDetail(!detail);
      if(document.getElementsByClassName('modalOn').length !== 0) {
        document.getElementsByClassName('modalOn')[0].classList.remove('modalOn') 
        }
      //   debugger
        e.target.parentElement.parentElement.children[1].classList.add('modalOn');
  }

  const test = (e) => {
    debugger
  }

  const addLikelist = () => {
    console.log(id, l_num);
    if (id == undefined) return alert("로그인 후 이용 가능합니다."), document.location.href = '/login';
    else return (
      axios.post('http://localhost:8000/api/post/likelistcheck',{id, l_num})
        .then(function (response) {
          console.log(response)
          if (response.data[0] == undefined) return (
            axios.post('http://localhost:8000/api/post/likelistcheck',{id, l_num})
            .then(function (response) {
              alert("즐겨찾기에 추가되었습니다")
            })
          )
          else return alert("이미 추가된 항목입니다.")
        })
    )
  }

  return (
    <div className={styles.SearchResultCard}>
      <div className={styles.search_container} onClick={onClickPlace}>    
        <div className={styles.search_title}>{card.p_name}</div>
        <div className={styles.search_address}>{card.address}</div>
        <div className={styles.search_detail_tag}>#{card.m_name}</div>
        <div className={styles.search_detail_tag}>#{card.category}</div>
        <button onClick={addLikelist}><MdBookmarkBorder size="20px"/></button>
      </div>

      <div className="search_detail">
          <div>
            <img className={styles.sm_img} src={'/location/location_' + card.l_image + '.png'}></img>
          </div>
          <div className={styles.sm_title}>{card.p_name}</div>
          <ul>{card.address}</ul>
          <ul>#{card.m_name}</ul>
          <ul>#{card.category}</ul>
          <button className="modal_close_btn" onClick={(e)=>{e.target.parentElement.classList.remove('modalOn')}}>X</button>
      </div> 
    </div>
  );
}