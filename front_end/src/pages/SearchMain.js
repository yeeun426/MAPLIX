import React, { useEffect, useState } from 'react';
import './SearchMain.css';
import area from "../img/cansearch.png";
import Jeonju from "../img/Jeonju.png";
import Busan from "../img/Busan.png";
import Suwon from "../img/Suwon.png";
import Jeju from "../img/Jeju.png";
import Gangneung from "../img/Gangneung.png";
import Daegu from "../img/Daegu.png";
import Pohang from "../img/Pohang.png";
import Incheon from "../img/Incheon.png";
import Map from "../img/Map.png";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import Footer from '../components/Footer'

function Search() {

  const navigate = useNavigate(); // Link 같은 역할

  const [searchKW, setSearchKW ] = useState('');
  const [activeSearchCate, setActiveSearchCate] = useState('title'); // title이랑 area클릭하는거..?

  const handleUserInput = (e) => {
    e.preventDefault();
    setSearchKW(e.target.value);
  };

  const onSubmitSearchbar = (e) => {
    console.log(e);
    //e.preventDefault();
    if(e.key === 'Enter') {
      onClickSearchbar();
    }
  }

  const onClickSearchbar = () => {
    navigate(`/search/${activeSearchCate}/${searchKW}`);
  }

  const ClickedSearchCate = (e) => {
    e.preventDefault();
    setActiveSearchCate(e.target.id);
    console.log(activeSearchCate);
  }

  return(
    <div className='Main_Search'>
      <div className='first_container'>
        <li id="titleMain">Maplix</li>  
        <li>영화, 드라마, 예능을 보면서 가고 싶은 곳을 지금 바로 찾아보세요!</li>

        <div className='Search_Category'>
          <li>
            <button onClick={ClickedSearchCate} id="title" className={activeSearchCate === 'title' && "btn_active"}>title</button>
          </li>
          <li><button onClick={ClickedSearchCate} id="area" className={activeSearchCate === 'area' && "btn_active"}>area</button></li>
        </div>
        {/* <form onSubmit={onSearch}>
          <input
            type="text" 
            onChange={ e => setSearchInput(e.target.value)}
            placeholder="Search"
          />
          <button type="submit">검색</button>
        </form> */}
        <form >
          <input value={searchKW} onChange={handleUserInput} onKeyPress={onSubmitSearchbar} type="text" placeholder="검색어를 입력해주세요." />
          
          <button type='submit' onClick={onClickSearchbar}><GoSearch/></button>
        </form>
      </div>    

      <div className='second_container'>
        everything you can search for
        <img src={area} alt = "cansearch" />
      </div>

      <div className='third_container'>
        <div style={{margin:'10px 0 10px 0', 'font-size':'18px'}}>Recommended Course</div>
      
        <div className = "third_list">
          <button className='third_img'>
            <img src={Jeonju} alt = "Jeonju" />
          </button>

          <button className='third_img'>
            <img src={Busan} alt = "Busan" />
          </button>

          <button className='third_img'>
            <img src={Suwon} alt = "Suwon" />
          </button>

          <button className='third_img'>
            <img src={Jeju} alt = "Jeju" />
          </button>

          <button className='third_img'>
            <img src={Gangneung} alt = "Gangneung" />
          </button>

          <button className='third_img'>
            <img src={Daegu} alt = "Daegu" />
          </button>

          <button className='third_img'>
            <img src={Pohang} alt = "Pohang" />
          </button>

          <button className='third_img'>
            <img src={Incheon} alt = "Incheon" />
          </button>
        </div>
      </div>

      <div className='fourth_container'>
        <img src={Map} alt = "Map" />
        <div className='fourth_item'>
          <div id="txt_course">Make your own course!</div>
          <div>
            가고싶은 관광지, 식당, 카페를 이용하여 나만의 코스를 만들어보세요!
            <br/>원하는 곳이 없다면 카테고리만 선택해보세요.
            <br/>AI가 코스를 추천해줍니다!
          </div>
          <button class="Make_btn">
            <Link to ="/course">
            Make now
            </Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
    );
  };

export default Search;