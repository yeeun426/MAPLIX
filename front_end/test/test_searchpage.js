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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SearchPage = ( props ) => {

  // 데이터 받아오기
  const location = useLocation();
  const navigate = useNavigate();
  const { word } = useParams();
 // const media = location.state.media; // 메인에서 검색한 미디어명
  const [searchWord, setSearchWord] = useState( word );
  const [search, setSearch] = useState(searchWord);

  const loadData = async () => {
    const response = await axios.get('http://localhost:8000/api/search', {
        params: {
            'media': searchWord
        }
    });
    console.log(response.data);
    setCardList(response.data);
    //setClickedList();
};

// 변수들
const [cardList, setCardList] = useState([]); // 키워드 검색시 반환된 데이터
const [filtered, setFiltered] = useState([]); // 필터링된 결과
const [activeCate, setActiveCate] = useState([ // 필터 어떤거 클릭됐는지, true : 클릭된상태
  { category : "mountain" , flag : false},
  { category : "forest" , flag : false},
  { category : "sea" , flag : false},
  { category : "river" , flag : false},
  { category : "restaurant" , flag : false},
  { category : "cafe" , flag : false},
  { category : "activity" , flag : false},
  { category : "tour" , flag : false},
  { category : "etc" , flag : false}
]);
const[isLiked, setIsLiked] = useState();

useEffect(()=> { 
  loadData();
}, [] );  
// includes(clickedlist[0], clickedlist[1],,)
// useEffect(()=> {
//   const temp = cardList.filter((card) => 
//   card.category.includes());
//   setClickedList(temp);
// }, [isClicked])


//필터기능
//누를때마다 걔의 flag를 true로 만든다음에 
//그때마다 새롭게 filter적용해서 post.flag = True 이런식으로 배열만들어주기


const filterOn = (e) => {
  let newKeywords = activeCate.map(k => {
    if (k.category === e.target.id) {
      return {
        ...k, flag : !k.flag,
      };
    } else {
      return k;
    }
  });
  setActiveCate(newKeywords);
  console.log(Object.values(activeCate));
  // 버튼 눌릴때마다 true인 것들의 이름만 찾아서 cardlist filter해줘야함 
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
            <button className='FilterIcons'  onClick={filterOn}>
              <img src={mountain} alt = "mountain" id="mountain" idx="0" />
              <li>#산</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={forest} alt = "forest" id="forest" idx="1"/>
              <li>#숲</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={sea} alt = "sea" id="sea" idx="2"/>
              <li>#바다</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={river} alt = "river" id="river" idx="3"/>
              <li>#강</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={restaurant} alt = "restaurant" id="restaurant" idx="4"/>
              <li>#음식점</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={cafe} alt = "cafe" id="cafe" idx="5"/>
              <li>#카페</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={acitivity} alt = "activity" id="activity" idx="6"/>
              <li>#액티비티</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={tour} alt = "tour" id="tour" idx="7"/>
              <li>#관광지</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={etc} alt = "etc" idx="8" />
              <li>#기타</li>            
            </button>
          </div>
        </div>

        <div className='Lower'>
        <SearchSidebar 
          filtered={filtered}  
          search={search} searchWord={searchWord}
          setSearch={setSearch} setSearchWord={setSearchWord}/>
        <MapContainer />

        </div>
      </div>
    )
  }

export default SearchPage;