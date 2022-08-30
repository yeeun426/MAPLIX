import React, { useEffect, useState } from "react";
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
import Footer from '../components/Footer';

import styled from 'styled-components';
import axios from "axios";
const { kakao } = window;
function Course(){

  
  const [result, setResult] = useState([]);
  const [activeCate, setActiveCate] = useState(null);
  
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");


  const id = window.localStorage.getItem("id");

  const initialCate = [ // 필터 어떤거 클릭됐는지, true : 클릭된상태
  { category : "likelist", flag : true, realCate: "즐겨찾기"},
  { category : "mediaplace", flag : false, realCate: "촬영지"},  
  { category : "mountain" , flag : false, realCate: "산"},
  { category : "forest" , flag : false, realCate: "숲"},
  { category : "sea" , flag : false, realCate: "바다"},
  { category : "river" , flag : false, realCate: "강"},
  { category : "restaurant" , flag : false, realCate: "음식점"},
  { category : "cafe" , flag : false, realCate: "카페"},
  { category : "activity" , flag : false, realCate: "체험"},
  { category : "tour" , flag : false, realCate: "관광지"},
  { category : "etc" , flag : false, realCate: "기타"}
];

// let nowkakaocate = activeCate.filter(k => {
//   if (k.flag !== "likelist" || k.flag !== 'mediaplace'){
//     if (k.flag )
//   }
//       return k.flag === true ? true : false })
const [dddd, setdddd] = useState("")

const [cardList, setCardList] = useState([])


const loadData = () => {

  let nowcate = "";

        for (var k=0; k < activeCate.length; k++){
          if (Object.values(activeCate)[k].flag === true){
            nowcate = Object.values(activeCate)[k].realCate
          }
        }

    if (Object.values(activeCate)[0].flag === true){ // likelist
        axios.post('http://localhost:8000/api/likelist',{id})
        .then(function (response) {
        console.log(response.data);
        setCardList(response.data);
        //console.log(Object.values(activeCate));
        // console.log(Object.values(activeCate)[0].flag);
        });
    } else if (Object.values(activeCate)[1].flag === true){
        axios.get('http://localhost:8000/api/search')
        .then(function (response) {
            setCardList(response.data);
        });
    } else{
      var ps = new kakao.maps.services.Places(); 

      ps.keywordSearch(nowcate , placesSearchCB, {page: 1 , size : 15}); 
      ps.keywordSearch(nowcate , placesSearchCB, {page: 2 , size : 15}); 
      ps.keywordSearch(nowcate , placesSearchCB, {page: 3 , size : 15}); 
      
      const newnew = []

      function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(data)
          for (var a=0; a < data.length; a++){
            newnew.push({address : data[a].address_name, category : nowcate, p_name : data[a].place_name, p_num : a})
          }

          
        }
      }
      setCardList(newnew);
    }
    console.log(cardList.length)
    
};



useEffect(()=> {
    if (activeCate){
      loadData();
    }
    console.log(activeCate)
    // console.log("courseadd 필터" + Object.values(activeCate));
},[activeCate]);      

useEffect(()=> {
  setActiveCate(initialCate);
  console.log('result = ', result);
}, []);

  
  // 중복필터
  const filterOn2 = (e) => {
    console.log("필터 버튼 눌림" + e.target.id);
    const newKeywords = activeCate.map(k => {
      if (k.category === e.target.id) {
        return { ...k, flag : !k.flag,};
      } else {
        return k;
      }
    });    
    setActiveCate(newKeywords);
    //console.log(Object.values(activeCate));
    // 버튼 눌릴때마다 true인 것들의 이름만 찾아서 cardlist filter해줘야함 
  };

  // 단일필터
  const filterOn = (e) => {
  
    const newKeywords = activeCate.map(k => {
      if (k.category === e.target.id) {

        return {...k, flag : true};
      }else {
        return {...k, flag : false};
      }
  
    });
   // console.log("필터 클릭 : ", nowclickcate)
   setActiveCate((prev) => {return newKeywords});
    // setActiveCate(() => {
    //   activeCate.map(k => {
    //     if (k.category === e.target.id){ return {...k, flag : true};}
    //     else{ return {...k, flag : false}}
    //   })
    // });
  };


  const onChange = (e) => {
    console.log(activeCate);
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
            <button className='FilterIcons' onClick={filterOn}>
              <img src={like} alt = "likelist" id='likelist' />
              <li>#즐겨찾기</li>            
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={like} alt = "mediaplace" id='mediaplace' />
              <li>#촬영지</li>            
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={mountain} alt = "mountain" id='mountain'/>
              <li>#산</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={forest} alt = "forest" id="forest"/>
              <li>#숲</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={sea} alt = "sea" id="sea"/>
              <li>#바다</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={river} alt = "river" id="river"/>
              <li>#강</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={restaurant} alt = "restaurant" id="restaurant"/>
              <li>#음식점</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={cafe} alt = "cafe" id="cafe"/>
              <li>#카페</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={acitivity} alt = "activity" />
              <li>#액티비티</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
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
            <CourseAdd activeCate={activeCate} cardList={cardList}/>
          </div>
          <MapContainer dddd={dddd} activeCate={activeCate} cardList={cardList} setCardList={setCardList} searchPlace={place} />      
          {/* <div
          id="kakaoMap"
          style={{
            height: '1000px',
          }}></div> */}
          </div>      
        </div>
    )
  }

  // styled. 
  
  export default Course;