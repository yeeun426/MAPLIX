import React from "react";
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

function SearchPage(){

    return(
      <div className='Search'>
        <div className='Upper'>
          <h1>Maplix</h1>
          <div className='Filter'>
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

            <button className='FilterIcons'>
              <img src={etc} alt = "etc" />
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