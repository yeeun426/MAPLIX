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

function Course(){
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

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
              <img src={like} alt = "etc" />
              <li>#즐겨찾기</li>            
            </button>

            <button className='FilterIcons'>
              <img src={mountain} alt = "mountain" />
              <li>#산</li>
            </button>

            <button className='FilterIcons'>
              <img src={forest} alt = "forest" />
              <li>#숲</li>
            </button>

            <button className='FilterIcons'>
              <img src={sea} alt = "sea" />
              <li>#바다</li>
            </button>

            <button className='FilterIcons'>
              <img src={river} alt = "river" />
              <li>#강</li>
            </button>

            <button className='FilterIcons'>
              <img src={restaurant} alt = "restaurant" />
              <li>#음식점</li>
            </button>

            <button className='FilterIcons'>
              <img src={cafe} alt = "cafe" />
              <li>#카페</li>
            </button>

            <button className='FilterIcons'>
              <img src={acitivity} alt = "activity" />
              <li>#액티비티</li>
            </button>

            <button className='FilterIcons'>
              <img src={tour} alt = "tour" />
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
            <div className="course-make">
              <button className="one-course">
                +
              </button>
            </div>
          </div>
          <MapContainer searchPlace={place}/>      

          </div>      
        </div>
    )
  }

export default Course;