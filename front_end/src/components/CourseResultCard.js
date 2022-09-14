// import { specialChars } from "@testing-library/user-event";
import {CourseResultCardStyle} from "./styled";
// import Modal from "./PostModal";
import React, { useState }from "react";

const { kakao } = window;

export default function SearchResultCard({card, setResult, lastCourse}) {

  var prevPos = new kakao.maps.LatLng(lastCourse.course.p_y, lastCourse.course.p_x);
  var nextPos = new kakao.maps.LatLng(card.p_y, card.p_x);

  var temp = [prevPos, nextPos]

  var moveLine = new kakao.maps.Polyline({  });

  moveLine.setPath(temp)

  const onClickPlace =()=> {
    if (window.confirm('경로에 추가하시겟습니까?')){
        setResult(card);
        alert("추가되었습니다")
    }
    if(document.getElementsByClassName('modalOn').length !== 0) {
      document.getElementsByClassName('modalOn')[0].classList.remove('modalOn') 
  }
  }
  return (
    <CourseResultCardStyle>
      <div className="modal-course-items" onClick={onClickPlace}>    
        <div className="mci-title">{card.p_name}</div>
        <div img_box>
            <ol>
                <ul className="mci-address">{card.address}</ul>
                {card.m_name == undefined ? 
                  null
                : <ul>#{card.m_name}</ul>}
                <ul>#{card.category}</ul>
                <ul className="mci-length"># "{lastCourse.course.p_name}" 과(와) {Math.round(moveLine.getLength()) / 1000 + 'Km 떨어진 거리'}</ul>
                {/* <button onClick={onClickPlace}>추가하기</button> */}
            
            </ol>
            {/* <button type='submit' onClick={onClickLikeBtn}>즐겨찾기</button> */}
        </div>
      </div>
    </CourseResultCardStyle>
  );
}