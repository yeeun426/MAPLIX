import './SearchSidebar.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import CommunityCard from './CommunityCard';
import styles from "../components/Community.module.css";

function SearchSidebar( props ){

    const location = useLocation();
    const navigate = useNavigate();

    // 현재상태값, 그 상태값을 갱신해주는 함수 / post 초기값 ( 빈배열 )
  const [cardList, setCardList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCate, setActiveCate] = useState("전체");

    // 메인에서 검색한 미디어명
    const media = location.state.media;
    console.log(media);

    const getCardListData = async () => {
        const response = await axios.get('http://localhost:8000/api/search', {
            params: {
                'media': media
            }
        });
        console.log(response.data);
        setCardList(response.data);
        setFiltered(response.data)
    };
            
    useEffect(()=> {
        getCardListData();
      }, [] );  
    //useEffect(()=> getCardListData(), [getCardListData]);
    ///



    // const media_name = media.state.media;
    // const navigate = useNavigate(); 
    // const [cardList, setCardList] = useState([]);

    // 데이터 가져오기
    // 데이터 가져오기
    // const loadPlace = async () => {
    //     const response = await axios.get('http://localhost:8000/api/search');
    //     console.log(response.data);
    //     // 전체 데이터가 초기 상태
    //     setPost(response.data);
    //     setFiltered(response.data)
    // };

    // const getCardListData = useCallback(async () => {
    //     const response = await axios.get('http://localhost:8000/api/search');
    //     const res = await fetch(
    //       `${BASE_URL}/main/search`
    //     );
    
    //     const data = await res.json();
    
    //     setCardList(data.result);
    //   }, [search]);
      
    //   useEffect(()=> getCardListData(), [getCardListData]);
    // ///


    const onChange = (e) => {
        console.log(e.target.value);
    }
    
    return (
        <div className="search-sidebar">
            <div className='sidebar_category'>
                <li><span>title</span></li>
                <li><span>area</span></li>
            </div>
    
            <input
            type="text" 
            onChange={onChange}
            placeholder={media}
            />

            <div className={styles.card_list}>
                {filtered.map((card, index) => {
                    return (
                        <div card = {card}>
                            <CommunityCard key={card.m_num} card={card} />

                        </div>
                    );
                })}

            </div>
        </div>

    );
}

export default SearchSidebar;