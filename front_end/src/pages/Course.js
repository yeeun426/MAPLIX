import React, { useState } from "react";
import './Course.css';
import mountain from "../img/mountain.png";
import forest from "../img/forest.png";
import sea from "../img/sea.png";
import river from "../img/river.png";
import restaurant from "../img/restaurant.png";
import cafe from "../img/cafe.png";
import acitivity from "../img/activity.png";
import tour from "../img/tour.png";
import like from "../img/like.png";
import MapContainer from '../components/MapContainer';
import CourseAdd from '../components/CourseAdd'

import styled from 'styled-components';

function Course(){
  // 변수들
  const [cardList, setCardList] = useState([]); // 키워드 검색시 반환된 데이터
  const [isLiked, setIsLiked] = useState(); // 즐겨찾기 추가하기 위한 변수
  //const [filtered, setFiltered] = useState(() => get비ㅏㅆㄴ초기계산값()); // 필터링된 결과
  const [filtered, setFiltered] = useState([]); 

  let cnt = 0;
  //const [cnt, setCnt] = useState(0);
  const [activeCate, setActiveCate] = useState([ // 필터 어떤거 클릭됐는지, true : 클릭된상태
    { category : "likelist", flag : true, realCate: "즐겨찾기"},
    { category : "mountain" , flag : false, realCate: "산"},
    { category : "forest" , flag : false, realCate: "숲"},
    { category : "sea" , flag : false, realCate: "바다"},
    { category : "river" , flag : false, realCate: "강"},
    { category : "restaurant" , flag : false, realCate: "음식점"},
    { category : "cafe" , flag : false, realCate: "카페"},
    { category : "activity" , flag : false, realCate: "액티비티"},
    { category : "tour" , flag : false, realCate: "관광지"},
    { category : "etc" , flag : false, realCate: "기타"}
  ]);
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");


//   // 데이터 받아오기
//   const loadData = async () => {
//     let response;
//     if ( searchCate === "title"){
//       response = await axios.get('http://localhost:8000/api/search/title', {
//         params: {
//             'media': search
//         }
//       });
//     } else if ( searchCate === "area"){
//       response = await axios.get('http://localhost:8000/api/search/area', {
//         params: {
//             'media': search
//         }
//       });
//     }

//     if (response.data.length > 0){
//     setCardList(response.data);
//     setFiltered(response.date);
//     }else{
//       console.log("결과가 없습니다 어쩌구 생성")
//     }

//     console.log("로드데이터", response.data.length);
// };

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };
    return(
      <div className='Search'>
        <div className='Upper'>
          <h1>Maplix</h1>
          <div className='Filter'>
            <button className='FilterIcons'>
              <img src={like} alt = "etc" id='likelist' />
              <li>#즐겨찾기</li>            
            </button>

            <button className='FilterIcons'>
              <img src={mountain} alt = "mountain" id='mountain'/>
              <li>#산</li>
            </button>

            <button className='FilterIcons'>
              <img src={forest} alt = "forest" id="forest"/>
              <li>#숲</li>
            </button>

            <button className='FilterIcons'>
              <img src={sea} alt = "sea" id="sea"/>
              <li>#바다</li>
            </button>

            <button className='FilterIcons'>
              <img src={river} alt = "river" id="river"/>
              <li>#강</li>
            </button>

            <button className='FilterIcons'>
              <img src={restaurant} alt = "restaurant" id="restaurant"/>
              <li>#음식점</li>
            </button>

            <button className='FilterIcons'>
              <img src={cafe} alt = "cafe" id="cafe"/>
              <li>#카페</li>
            </button>

            <button className='FilterIcons'>
              <img src={acitivity} alt = "activity" />
              <li>#액티비티</li>
            </button>

            <button className='FilterIcons'>
              <img src={tour} alt = "tour" id="tour"/>
              <li>#관광지</li>
            </button>

          </div>
        </div>

        <div className='Lower'>
          <form className="inputForm" onSubmit={handleSubmit}>
            <input
              placeholder="Search Place..."
              onChange={onChange}
              value={inputText}
            />
            <button type="submit">검색</button>
          </form>

          <div className="course-sidebar">
            <div id="course-line"></div>
            <CourseAdd/>
          </div>
          <MapContainer searchPlace={place}/>      

          </div>      
        </div>
    )
  }

  // styled. 
  
  export default Course;
