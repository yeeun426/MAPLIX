import React, { useState, useEffect } from "react";
import './SearchPage.css';
import mountain from "../img/mountain.png";
import forest from "../img/forest.png";
import sea from "../img/sea.png";
import river from "../img/river.png";
import restaurant from "../img/restaurant.png";
import cafe from "../img/cafe.png";
import acitivity from "../img/activity.png";
import tour from "../img/tour.png";
import etc from "../img/etc.png";
import MapContainer from '../components/MapContainer';
import SearchSidebar from '../components/SearchSidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchPage(){

  // 데이터 받아오기
  const location = useLocation();
  const navigate = useNavigate();
  const media = location.state.media; // 메인에서 검색한 미디어명

  const getCardListData = async () => {
    const response = await axios.get('http://localhost:8000/api/search', {
        params: {
            'media': media
        }
    });
    console.log(response.data);
    setCardList(response.data);
    //setFiltered(response.data)
};

// 변수들
const [cardList, setCardList] = useState([]);

const [isClicked, setIsClicked] = useState(false);

const [clickedList, setClickedList] = useState([
    // mountain : false,
    // forest : false,
    // sea : false,
    // river : false,
    // restaurant : false,
    // cafe : false,
    // activity : false,
    // tour : false,
    // etc : false
  { category : "mountain" , flag : false},
  { category : "forest" , flag : false},
  { category : "sea" , flag : false},
  { category : "river" , flag : false},
  { category : "restaurant" , flag : false},
  { category : "cafe" , flag : false},
  { category : "activity" , flag : false},
  { category : "tour" , flag : false},
  { category : "etc" , flag : false}
  // { "mountain" : false},
  // { "forest" : false},
  // { "sea" : false},
  // { "river" : false},
  // { "restaurant" : false},
  // { "cafe" : false},
  // { "activity" : false},
  // { "tour" : false},
  // { "etc" : false}
]);

const [isLiked, setIsLiked] = useState();

useEffect(()=> { getCardListData();}, [] );  

// const updateState = (e) => {
//   const clickedBtn = e.target.id;
//   const idx = e.target.getAttribute('idx');

//   const newState = clickedList.map(obj => {
//     // 👇️ if id equals 2, update country property
//     if (obj.category === clickedBtn){
//       return {...obj, [obj.category] : !obj.flag};
//     }
//   });

//   setClickedList(newState);
// };

//필터기능
//누를때마다 걔의 flag를 true로 만든다음에 
//그때마다 새롭게 filter적용해서 post.flag = True 이런식으로 배열만들어주기
const onClickFilterBtn = (e) => {
  const clickedBtn = e.target.id;
  const idx = e.target.getAttribute('idx');
  // if Object.keys
  // console.log(Object.keys());

  // setClickedList((prev) => {
  //   let next = {...prev};
  //   console.log(Object.keys(clickedList));
  
  // });
};

  
  
  // setClickedList((prev) => {...clickedList, O : Object.values(clickedList[idx])});
//setClickedList(prev => ({...prev, category:{...prev.category, mountain : true} }));
  // console.log(e.target.id, idx);
  // console.log('clickedlist' + Object.values(clickedList[0]));
  // console.log(clickedList[0].mountain);


  //const temp = Object.values(clickedList);
  //console.log('temp' + temp);

  // const filtered = cardList.filter(card => card.category.includes(clickedBtn));
  // console.log('필터된거' + filtered);


//console.log('clickedlist' + clickedList.values());


// 그 값 card로 넘겨주기

// 좋아요 기능
  


    return(
      <div className='Search'>
        <div className='Upper'>
          <h1>Maplix</h1>
          <div className='Filter'>
            <button className='FilterIcons'  onClick={onClickFilterBtn}>
              <img src={mountain} alt = "mountain" id="mountain" idx="0"/>
              <li>#산</li>
            </button>

            <button className='FilterIcons'>
              <img src={forest} alt = "forest" id="forest" idx="1"/>
              <li>#숲</li>
            </button>

            <button className='FilterIcons'>
              <img src={sea} alt = "sea" id="sea" idx="2"/>
              <li>#바다</li>
            </button>

            <button className='FilterIcons'>
              <img src={river} alt = "river" id="river" idx="3"/>
              <li>#강</li>
            </button>

            <button className='FilterIcons'>
              <img src={restaurant} alt = "restaurant" id="restaurant" idx="4"/>
              <li>#음식점</li>
            </button>

            <button className='FilterIcons'>
              <img src={cafe} alt = "cafe" id="cafe" idx="5"/>
              <li>#카페</li>
            </button>

            <button className='FilterIcons'>
              <img src={acitivity} alt = "activity" id="activity" idx="6"/>
              <li>#액티비티</li>
            </button>

            <button className='FilterIcons'>
              <img src={tour} alt = "tour" id="tour" idx="7"/>
              <li>#관광지</li>
            </button>

            <button className='FilterIcons'>
              <img src={etc} alt = "etc" idx="8" />
              <li>#기타</li>            
            </button>

          </div>
        </div>

        <div className='Lower'>
        <SearchSidebar />
        <MapContainer />

        </div>
      </div>
    )
  }

export default SearchPage;