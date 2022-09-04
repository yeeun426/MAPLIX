import './SearchSidebar.css';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import CommunityCard from './CommunityCard';
import styles from "../components/Community.module.css";
import SearchResultCard from './SearchResultCard';

function SearchSidebar( {search, searchWord, setSearch, setSearchWord} ){
  
    
    const location = useLocation();
    const navigate = useNavigate();
    const { word } = useParams(); // 다른 사람 코드에서 props.match.params 라고 되어있는거 이제 이렇게 받아와야함

    console.log('searchpage'+word);

    const ClickedSearchCate = (e) => {
        e.preventDefault();
        debugger
    }

    // const media = location.state.media;
    // console.log(media);
    
//     // 현재상태값, 그 상태값을 갱신해주는 함수 / post 초기값 ( 빈배열 )
//   const [cardList, setCardList] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [activeCate, setActiveCate] = useState("전체");

//     // 메인에서 검색한 미디어명
    

//     const getCardListData = async () => {
//         const response = await axios.get('http://localhost:8000/api/search', {
//             params: {
//                 'media': media
//             }
//         });
//         console.log(response.data);
//         setCardList(response.data);
//         setFiltered(response.data)
//     };
            
//     useEffect(()=> {
//         getCardListData();
//       }, [] );  


    const handleUserInput = (e) => {
        e.preventDefault();
        //setSearch(e.target.value);
        
    };

    const onSubmitSearchbar = (e) => {
        console.log(e);
        //e.preventDefault();
        if(e.key === 'Enter') {
        onClickSearchbar(e);
        }
    }

    const onClickSearchbar = (e) => {
        setSearchWord(e.target.value)
        navigate(`/search/title/${word}`);
      }

    return (
        <div className="search-sidebar">
            <div className='sidebar_category'>
                <li><button id="title">title</button></li>
                <li><button id="area">area</button></li>
            </div>
            <form>
                
            <input
                type="text" 
                onChange={handleUserInput}
                onKeyPress={onSubmitSearchbar}
                placeholder="search"
                // defaultValue={media}
                //value={search}
                />
            
            <button type='submit' onClick={onClickSearchbar}>검색</button>

            </form>

            <div className={styles.card_list}>
                {/* {filtered.map((card, index) => {
                    return (
                        <div card = {card}>
                            <SearchResultCard 
                                key={card.l_num}   
                                card={card}
                                // isWishList={wishList.includes(card.lecture_id)}
                                getCardListData />
                           

                        </div>
                    );
                })} */}

            </div>
        </div>

    );
}

export default SearchSidebar;