import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "../components/Community.module.css";
import SearchResultCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';

const { kakao } = window;

function SearchPage () {

  const id = window.localStorage.getItem("id");
  
  const navigate = useNavigate();
  // 메인에서 검색한 키워드 받아오기
  const useparams = useParams();

  // 메인에서 선택한 카테고리 (title / area)
  let searchCate = useparams.cate;

  // const { searchCate, SetSearchCate} = useState(useparams.cate);
  // const { cate, setCate } = useState(searchCate);

  // 메인에서 검색한 키워드
  const [searchWord, setSearchWord] = useState( useparams.word );
  // SearchPage내에서 검색한 키워드로 넣어주기?
  const [search, setSearch] = useState(searchWord);


  // 변수들
  const [cardList, setCardList] = useState([]); // 키워드 검색시 반환된 데이터
  const [isLiked, setIsLiked] = useState(); // 즐겨찾기 추가하기 위한 변수
  //const [filtered, setFiltered] = useState(() => get비ㅏㅆㄴ초기계산값()); // 필터링된 결과
  const [filtered, setFiltered] = useState([]); 

  const initialCate = [
    { category : "mountain" , flag : true, realCate: "산"},
    { category : "forest" , flag : true, realCate: "숲"},
    { category : "sea" , flag : true, realCate: "바다"},
    { category : "river" , flag : true, realCate: "강"},
    { category : "restaurant" , flag : true, realCate: "음식점"},
    { category : "cafe" , flag : true, realCate: "카페"},
    { category : "activity" , flag : true, realCate: "액티비티"},
    { category : "tour" , flag : true, realCate: "관광지"},
    { category : "etc" , flag : true, realCate: "기타"}
  ];


  // 데이터 받아오기
  const loadData = () => {
    if ( searchCate === "title"){
      axios.get('http://localhost:8000/api/search/title', {
        params: {
            'media': search
        }
      }).then(function (response) {
        console.log(response.data);
        setCardList(response.data);
        setFiltered(response.data);
      });

    } else if ( searchCate === "area"){
      axios.get('http://localhost:8000/api/search/area', {
        params: {
            'media': search
        }
      }).then(function (response) {
        console.log(response.data);
        setCardList(response.data);
        setFiltered(response.data);
      });
    }

};


//const [cnt, setCnt] = useState(0);
const [activeCate, setActiveCate] = useState(null); // 필터 어떤거 클릭됐는지, true : 클릭된상태
const [courselist, setCourselist] = useState([])

useEffect(() => {
  if (activeCate){
    loadData();
  }
},[activeCate, search, searchCate]);

useEffect(()=> {
  setActiveCate(initialCate);
  // console.log('result = ', result);
}, []);



// useEffect(() => {

  
//   // activeCate안에 값 바뀔때마다 filter로 flag값이 true인 값들의 category만 뽑아서 temp에 저장
//   // 그 temp
//   if (activeCate){
//     const temp = activeCate.map((obj) => {
//       if (obj.flag === true) 
//         arr.push(obj.realCate);
//     } );
//     console.log(arr);
   
//     let filtered = cardList.filter((card) => arr.includes(card.category) );
//     setFiltered(filtered);
//   }
  
 
// }, [ activeCate])

const filterOn = (e) => {
  if(document.getElementsByClassName('filterOn').length !== 0) {
  document.getElementsByClassName('filterOn')[0].classList.remove('filterOn') 
  }

  const newnew = cardList.filter((card) => card.category === e.target.id)

  console.log(newnew)

  console.log("필터 버튼 눌림" + e.target.id);
  e.target.parentElement.classList.add('filterOn');

  setFiltered(newnew);
  //console.log(Object.values(activeCate));
  // 버튼 눌릴때마다 true인 것들의 이름만 찾아서 cardlist filter해줘야함 
};


const handleUserInput = (e) => {
  e.preventDefault();
  setSearch(e.target.value);
};

const onSubmitSearchbar = (e) => {
  console.log(e);
  e.preventDefault();
  if(e.key === 'Enter') {
  onClickSearchbar(e);
  }
}

const onClickSearchbar = (e) => {
  setSearch(e.target.value);
  e.preventDefault();
  var temp = document.getElementById('searchbox').value
  navigate(`/search/${searchCate}/${temp}`);
  console.log('파라미터'+ search);
}

const ClickedSearchCate = (e) => {
  e.preventDefault();
  searchCate = e.target.id;
  var temp = document.getElementById('searchbox').value
  navigate(`/search/${searchCate}/${temp}`);
}
const clickall = () => {
  setActiveCate((activeCate) =>  activeCate.map(k => {
      return { ...k, flag : !k.flag,};
  }));
}

const [currentPage, setCurrentPage] = useState(1); //현재 페이지 번호
const [postsPerPage, setPostsPerPage] = useState(5);

const indexOfLast = currentPage * postsPerPage; //postsPerPage : 총 데이터를 postsPerPage만큼 등분해서 보여줍니다.
const indexOfFirst = indexOfLast - postsPerPage;
const currentPosts = (posts) => {
  let currentPosts = 0;
  currentPosts = filtered.slice(indexOfFirst, indexOfLast);
  return currentPosts;
};



    return(
      <div className='Search'>
        <div className='Upper'>
          <h1>Maplix</h1>
          <div className='Filter'>

            <button className='FilterIcons'  onClick={filterOn}>
              <img src={mountain} alt = "mountain" id="산" idx="0" kid="산"/>
              <li>#산</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={forest} alt = "forest" id="숲" idx="1"/>
              <li>#숲</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={sea} alt = "sea" id="바다" idx="2"/>
              <li>#바다</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={river} alt = "river" id="강" idx="3"/>
              <li>#강</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={restaurant} alt = "restaurant" id="음식점" idx="4"/>
              <li>#음식점</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={cafe} alt = "cafe" id="카페" idx="5"/>
              <li>#카페</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={acitivity} alt = "activity" id="액티비티" idx="6"/>
              <li>#액티비티</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={tour} alt = "tour" id="관광지" idx="7"/>
              <li>#관광지</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={etc} alt = "etc" id="기타" idx="8" />
              <li>#기타</li>            
            </button>
          </div>
        </div>

        <div className='Lower'>
        <div className="search-sidebar">
            <div className='sidebar_category'>
              {/* 현재 활성화된 카테고리(title, area)는 cate로 확인하면 됩니다~ */}
              <li><button className={searchCate === 'title' && "btn_active"} onClick={ClickedSearchCate} id="title">title</button></li>
              <li><button className={searchCate === 'area' && "btn_active"} onClick={ClickedSearchCate} id="area">area</button></li>
            </div>
            
            <input
                id="searchbox"
                type="text" 
                onChange={handleUserInput}
                onKeyPress={onSubmitSearchbar}
                placeholder={search}
                // defaultValue={search}
                value={search}
                />
            
            <button type='submit' onClick={onClickSearchbar} value={search}>검색</button>
            {/* <button className='FilterIcons'  onClick={clickall}>
              <li>#전체 결과 조회하기</li>
            </button> */}

          {filtered.length !== 0 ?
            <div className={styles.card_list}>
                { filtered && currentPosts(filtered).map((card, index) => {
                    return (
                        <div card =  {card}>
                            <SearchResultCard 
                                key={card.l_num}   
                                card={card}
                                // isWishList={wishList.includes(card.lecture_id)}
                                 />
                        </div>
                    );
                })}
            </div>
            :
            <div className={styles.none_wrapper}>
              <span className={styles.none_title}>'{search}'</span>
              <span className={styles.none_result_title}>에 대한 검색결과가 없습니다.</span>
              <div className={styles.none_result_txt}>
                단어의 철자가 정확한지 확인해 보세요.<br />
                한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.<br />
                검색어의 단어 수를 줄이거나,<br/> 보다 일반적인 검색어로 다시 검색해 보세요.<br />
                두 단어 이상의 검색어인 경우,<br/> 띄어쓰기를 확인해 보세요.<br />
                키워드 수를 줄여보세요.
              </div>
              <div styles={{fontSize: "18px"}}>Contact Us</div>
              <span>원하는 드라마, 영화, 예능의 촬영지가 없다면 </span>
              <span className={styles.none_result_request}>'요청하기'</span>
              <span>를 이용하세요</span>
              <Link to='/mypage/request'>
                <button>요청하기</button>
              </Link>
            </div>
            }
            
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={filtered.length}
                paginate={setCurrentPage}
              />
        </div>
        <MapContainer activeCate={activeCate} cardList={filtered} courselist={courselist}/>


        </div>
      </div>
    )
  }

export default SearchPage;

//----------------------------------------------------------------------------------------------

// import React, { useState, useEffect, useRef } from "react";
// import './SearchPage.css';
// import mountain from "../img/mountain.png";
// import forest from "../img/forest.png";
// import sea from "../img/sea.png";
// import river from "../img/river.png";
// import restaurant from "../img/restaurant.png";
// import cafe from "../img/cafe.png";
// import acitivity from "../img/activity.png";
// import tour from "../img/tour.png";
// import etc from "../img/etc.png";
// import MapContainer from '../components/MapContainer';
// import SearchSidebar from '../components/SearchSidebar';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import styles from "../components/Community.module.css";
// import SearchResultCard from '../components/SearchResultCard';

// const SearchPage = ( props ) => {
  
//   const location = useLocation();
//   const navigate = useNavigate();
//   // 메인에서 검색한 키워드 받아오기
//   const useparams = useParams();

//   // 메인에서 선택한 카테고리 (title / area)
//   let searchCate = useparams.cate;

//   // const { searchCate, SetSearchCate} = useState(useparams.cate);
//   // const { cate, setCate } = useState(searchCate);

//   // 메인에서 검색한 키워드
//   const [searchWord, setSearchWord] = useState( useparams.word );
//   // SearchPage내에서 검색한 키워드로 넣어주기?
//   const [search, setSearch] = useState(searchWord);

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

//     setCardList(response.data);
//     setFiltered(response.date);
//     console.log("로드데이터");
// };

// // 변수들
// const [cardList, setCardList] = useState([]); // 키워드 검색시 반환된 데이터
// const [isLiked, setIsLiked] = useState(); // 즐겨찾기 추가하기 위한 변수
// //const [filtered, setFiltered] = useState(() => get비ㅏㅆㄴ초기계산값()); // 필터링된 결과
// const [filtered, setFiltered] = useState([]); 

// let cnt = 0;
// //const [cnt, setCnt] = useState(0);
// const [activeCate, setActiveCate] = useState([ // 필터 어떤거 클릭됐는지, true : 클릭된상태
//   { category : "mountain" , flag : false, realCate: "산"},
//   { category : "forest" , flag : false, realCate: "숲"},
//   { category : "sea" , flag : false, realCate: "바다"},
//   { category : "river" , flag : false, realCate: "강"},
//   { category : "restaurant" , flag : false, realCate: "음식점"},
//   { category : "cafe" , flag : false, realCate: "카페"},
//   { category : "activity" , flag : false, realCate: "액티비티"},
//   { category : "tour" , flag : false, realCate: "관광지"},
//   { category : "etc" , flag : false, realCate: "기타"}
// ]);

// useEffect(()=> { 
//   loadData();
//   // console.log(useparams.cate); // 왜 얘는 되고
//   // console.log(cate); // 얘는 안되는지;
//   // console.log(searchWord);
// }, [search, searchCate] ); //search, searchCate

// useEffect(() => {

  
//   // activeCate안에 값 바뀔때마다 filter로 flag값이 true인 값들의 category만 뽑아서 temp에 저장
//   // 그 temp
//   var arr = [];
//   const temp = activeCate.map((obj) => {
//     if (obj.flag === true) 
//       arr.push(obj.realCate);
//   } );
//   console.log(arr);


 
//   let filtered = cardList.filter((card)=> {
//     if (arr.includes(card.category)){
//       return true;
//     }
//    });
//   setFiltered(filtered);
 

// }, [activeCate])


// const filterOn = (e) => {
//   console.log("필터 버튼 눌림" + e.target.id);
//   var count = 0;
//   const newKeywords = activeCate.map(k => {
//     if (k.category === e.target.id) {
//       return { ...k, flag : !k.flag,};
//     } else {
//       return k;
//     }
//   });
//   newKeywords.map(item => {
//     if (item.flag === true) count++;
//   });
//   setActiveCate(newKeywords);
//   console.log(count);
//   //console.log(Object.values(activeCate));
//   // 버튼 눌릴때마다 true인 것들의 이름만 찾아서 cardlist filter해줘야함 
// };


// const handleUserInput = (e) => {
//   e.preventDefault();
//   setSearch(e.target.value);
// };

// const onSubmitSearchbar = (e) => {
//   console.log(e);
//   //e.preventDefault();
//   if(e.key === 'Enter') {
//   onClickSearchbar(e);
//   }
// }

// const onClickSearchbar = (e) => {
//   setSearch(e.target.value);
//   navigate(`/search/${searchCate}/${search}`);
//   console.log('파라미터'+ search);
// }

// const ClickedSearchCate = (e) => {
//   e.preventDefault();
//   searchCate = e.target.id;
//   navigate(`/search/${searchCate}/${search}`);
// }

//     return(
//       <div className='Search'>
//         <div className='Upper'>
//           <h1>Maplix</h1>
//           <div className='Filter'>
//             <button className='FilterIcons'  onClick={filterOn}>
//               <img src={mountain} alt = "mountain" id="mountain" idx="0" />
//               <li>#산</li>
//             </button>

//             <button className='FilterIcons' onClick={filterOn}>
//               <img src={forest} alt = "forest" id="forest" idx="1"/>
//               <li>#숲</li>
//             </button>

//             <button className='FilterIcons' onClick={filterOn}>
//               <img src={sea} alt = "sea" id="sea" idx="2"/>
//               <li>#바다</li>
//             </button>

//             <button className='FilterIcons' onClick={filterOn}>
//               <img src={river} alt = "river" id="river" idx="3"/>
//               <li>#강</li>
//             </button>

//             <button className='FilterIcons' onClick={filterOn}>
//               <img src={restaurant} alt = "restaurant" id="restaurant" idx="4"/>
//               <li>#음식점</li>
//             </button>

//             <button className='FilterIcons' onClick={filterOn}>
//               <img src={cafe} alt = "cafe" id="cafe" idx="5"/>
//               <li>#카페</li>
//             </button>

//             <button className='FilterIcons' onClick={filterOn}>
//               <img src={acitivity} alt = "activity" id="activity" idx="6"/>
//               <li>#액티비티</li>
//             </button>

//             <button className='FilterIcons' onClick={filterOn}>
//               <img src={tour} alt = "tour" id="tour" idx="7"/>
//               <li>#관광지</li>
//             </button>

//             <button className='FilterIcons' onClick={filterOn}>
//               <img src={etc} alt = "etc" id="etc" idx="8" />
//               <li>#기타</li>            
//             </button>
//           </div>
//         </div>

//         <div className='Lower'>
//         <div className="search-sidebar">
//             <div className='sidebar_category'>
//               {/* 현재 활성화된 카테고리(title, area)는 cate로 확인하면 됩니다~ */}
//               <li><button onClick={ClickedSearchCate} id="title">title</button></li>
//               <li><button onClick={ClickedSearchCate} id="area">area</button></li>
//             </div>
            
//             <input
//                 type="text" 
//                 onChange={handleUserInput}
//                 onKeyPress={onSubmitSearchbar}
//                 placeholder="search"
//                 defaultValue={searchWord}
//                 value={search}
//                 />
            
//             <button type='submit' onClick={onClickSearchbar}>검색</button>

//             <div className={styles.card_list}>
//                 { filtered && filtered.map((card, index) => {
//                     return (
//                         <div card = {card}>
//                             <SearchResultCard 
//                                 key={card.l_num}   
//                                 card={card}
//                                 // isWishList={wishList.includes(card.lecture_id)}
//                                  />
                           

//                         </div>
//                     );
//                 })}

//             </div>
//         </div>
//         <MapContainer />

//         </div>
//       </div>
//     )
//   }

// export default SearchPage;