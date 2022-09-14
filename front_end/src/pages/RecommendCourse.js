import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";

import axios from 'axios';
import {RecommendStyle} from "../components/styled"
import styles from "./RecommendCourse.module.css"
import Loading from '../components/Loading'
// import RecommendGangneungImg from '../components/RecommendGangneungImg'

import RecommendImg from '../data/RecommendImg.json'
SwiperCore.use([Navigation, Pagination]);

function RecommendCourse() {

  const API_key = "qOrtK%2BP%2BSUQm0rcdn3r7FH%2BTM1pWuM%2BgLzo9hx3Bow5ZHgfBnBkxPChcZjnOnZ3IxliESS34QGYiUC9Gg0ui%2Fw%3D%3D"
  const url = `https://apis.data.go.kr/B551011/Durunubi/courseList?numOfRows=3000&pageNo=1&MobileOS=ETC&MobileApp=maplix&serviceKey=${API_key}&_type=json`;
  
  const [gangneungCourse, setGangneungCourse] = useState([])
  const [seoulCourse, setSeoulCourse] = useState([])
  const [jejuCourse, setJejuCourse] = useState([])
  const [incheonCourse, setIncheonCourse] = useState([])
  const [busanCourse, setBusanCourse] = useState([])
  
  const [loading, setLoading] = useState(true);
  const RecommendCourses = async(e) => {
    try {
        const data = await axios({
        method:'get', //정보 조회
        url: url
        })
        console.log(data.data)      
        for (let i = 0; i < data.data.response.body.items.item.length; i++) {
          if(data.data.response.body.items.item[i].crsTourInfo.includes('드라마') === true 
              || data.data.response.body.items.item[i].crsTourInfo.includes('영화') === true
              || data.data.response.body.items.item[i].crsTourInfo.includes('촬영') === true
              || data.data.response.body.items.item[i].crsContents.includes('촬영') === true) {
            if(data.data.response.body.items.item[i].sigun.includes('강릉') === true) {
              setGangneungCourse(prev => {return[...prev, data.data.response.body.items.item[i]]})
              setLoading(false);
            }else if(data.data.response.body.items.item[i].sigun.includes('서울') === true) {
              setSeoulCourse(prev => {return[...prev, data.data.response.body.items.item[i]]})
              setLoading(false);
            }else if(data.data.response.body.items.item[i].sigun.includes('제주') === true) {
              setJejuCourse(prev => {return[...prev, data.data.response.body.items.item[i]]})
              setLoading(false);
            }else if(data.data.response.body.items.item[i].sigun.includes('인천') === true) {
              setIncheonCourse(prev => {return[...prev, data.data.response.body.items.item[i]]})
              setLoading(false);
            }else if(data.data.response.body.items.item[i].sigun.includes('부산') === true) {
              setBusanCourse(prev => {return[...prev, data.data.response.body.items.item[i]]})
              setLoading(false);
            }
        }
      }      
        }catch(err) {
            console.log(err);
        }
    }
  
    useEffect(()=>{
      RecommendCourses();
    },[])

    console.log(gangneungCourse)
    console.log(busanCourse)
    console.log(jejuCourse)
    console.log(incheonCourse)
    console.log(seoulCourse)

  const ActiveRecommendArea = (e) => {
    if(document.getElementsByClassName('active_area_menu').length !== 0 ){
    document.getElementsByClassName('active_area_menu')[0].classList.remove('active_area_menu')
    }
    e.target.classList.add('active_area_menu')
    console.log(e.target.id);

    if(e.target.id === 'gangneung') {
      document.getElementsByClassName('active')[0].classList.remove('active');
      e.target.parentElement.parentElement.children[1].children[0].classList.add('active');
    }else if(e.target.id ==='seoul') {
      document.getElementsByClassName('active')[0].classList.remove('active');
      e.target.parentElement.parentElement.children[1].children[1].classList.add('active');
    }else if(e.target.id ==='busan') {
      document.getElementsByClassName('active')[0].classList.remove('active');
      e.target.parentElement.parentElement.children[1].children[2].classList.add('active');
    }else if(e.target.id ==='incheon') {
      document.getElementsByClassName('active')[0].classList.remove('active');
      e.target.parentElement.parentElement.children[1].children[3].classList.add('active');
    }else if(e.target.id ==='jeju') {
      document.getElementsByClassName('active')[0].classList.remove('active');
      e.target.parentElement.parentElement.children[1].children[4].classList.add('active');
    }
  }

  return (
    <RecommendStyle>
        <div id={styles.title}>
          Recommended course 
          <br/>for Durunubi
        </div>

        <div>
          TV, 영화 속 장면에 대한 촬영지 정보를 중심으로 <br/>주변 관광정보를 종합 제공하는 통합여행정보 서비스인 '두루누비'의 코스 정보
        </div>

        <div className="recommend_course_wrapper">
          <div className="recommend_course_area">
            <button id="gangneung" className="active_area_menu" onClick={ActiveRecommendArea}>강릉</button>
            <button id="seoul" onClick={ActiveRecommendArea}>서울</button>
            <button id="busan" onClick={ActiveRecommendArea}>부산</button>
            <button id="incheon" onClick={ActiveRecommendArea}>인천</button>
            <button id="jeju" onClick={ActiveRecommendArea}>제주</button>
          </div>

        {loading
        ?<Loading />
        :<div className="recommend_course_container">
          <div className="recommend_course_list active">
          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            navigation
            pagination={{clickable: true}}
          >
          {gangneungCourse.map((course, index) => (
            <SwiperSlide>
            <div className="recommend_course_item" key={index}>
            {RecommendImg.gangneung.map((img)=>(
            <>
              {index === img.id && 
                <div className="course_img">
                  <img src={img.img} alt=""/>
                </div>
                }
            </>
              ))}
              <div className="course_title">
                {course.crsKorNm}
              </div>

              <div className="course_info" style={{marginTop:"15px"}}>
                <div className="course_sub">course</div>
                <div>
                {course.crsTourInfo.replace(/<br>/gdi,"\n")}
                </div>
              </div>

              <div className="course_info">
                <div className="course_sub">contents</div>
                {course.crsContents.replace(/<br>/gdi,"\n")}
              </div>

              <div className="course_info">
                <div className="course_sub">traveler info</div>
                {course.travelerinfo.replace(/<br>/gdi,"\n")}
              </div>
            </div>
            </SwiperSlide>
          ))}
          </Swiper>
          </div>

          <div className="recommend_course_list">
          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            navigation
            pagination={{clickable: true}}
          >
          {seoulCourse.map((course, index) => (
            <SwiperSlide>
            <div className="recommend_course_item" key={index}>
            {RecommendImg.seoul.map((img)=>(
            <>
              {index === img.id && 
                <div className="course_img">
                  <img src={img.img} alt=""/>
                </div>
                }
            </>
            ))}
              <div className="course_title">
                {course.crsKorNm}
              </div>

              <div className="course_info" style={{marginTop:"15px"}}>
                <div className="course_sub">course</div>
                <div>
                {course.crsTourInfo.replace(/<br>/gdi,"\n")}
                </div>
              </div>

              <div className="course_info">
                <div className="course_sub">contents</div>
                {course.crsContents.replace(/<br>/gdi,"\n")}
              </div>

              <div className="course_info">
                <div className="course_sub">traveler info</div>
                {course.travelerinfo.replace(/<br>/gdi,"\n")}
              </div>
            </div>
            </SwiperSlide>
          ))}
            </Swiper>
          </div>

          <div className="recommend_course_list">
          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            navigation
            pagination={{clickable: true}}
          >
          {busanCourse.map((course, index) => (
            <SwiperSlide>
            <div className="recommend_course_item" key={index}>
            {RecommendImg.busan.map((img)=>(
            <>
              {index === img.id && 
                <div className="course_img">
                  <img src={img.img} alt=""/>
                </div>
                }
            </>
              ))}
              <div className="course_title">
                {course.crsKorNm}
              </div>

              <div className="course_info" style={{marginTop:"15px"}}>
                <div className="course_sub">course</div>
                <div>
                {course.crsTourInfo.replace(/<br>/gdi,"\n")}
                </div>
              </div>

              <div className="course_info">
                <div className="course_sub">contents</div>
                {course.crsContents.replace(/<br>/gdi,"\n")}
              </div>

              <div className="course_info">
                <div className="course_sub">traveler info</div>
                {course.travelerinfo.replace(/<br>/gdi,"\n")}
              </div>
            </div>
            </SwiperSlide>
          ))}
            </Swiper>
          </div>

          <div className="recommend_course_list">
          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            navigation
            pagination={{clickable: true}}
          >
          {incheonCourse.map((course, index) => (
            
            <SwiperSlide>
            <div className="recommend_course_item" key={index}>
            {RecommendImg.incheon.map((img)=>(
              <>
                {index === img.id && 
                  <div className="course_img">
                    <img src={img.img} alt=""/>
                  </div>
                  }
              </>
            ))}
              <div className="course_title">
                {course.crsKorNm}
              </div>

              <div className="course_info" style={{marginTop:"15px"}}>
                <div className="course_sub">course</div>
                <div>
                {course.crsTourInfo.replace(/<br>/gdi,"\n")}
                </div>
              </div>

              <div className="course_info">
                <div className="course_sub">contents</div>
                {course.crsContents.replace(/<br>/gdi,"\n")}
              </div>

              <div className="course_info">
                <div className="course_sub">traveler info</div>
                {course.travelerinfo.replace(/<br>/gdi,"\n")}
              </div>
            </div>
            </SwiperSlide>
          ))}
          </Swiper>
          </div>

          <div className="recommend_course_list">
          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            navigation
            pagination={{clickable: true}}
          >
          {jejuCourse.map((course, index) => (
            <SwiperSlide>
            <div className="recommend_course_item" key={index}>
            {RecommendImg.jeju.map((img)=>(
              <>
                {index === img.id && 
                  <div className="course_img">
                    <img src={img.img} alt=""/>
                  </div>
                  }
              </>
              ))}
              <div className="course_title">
                {course.crsKorNm}
              </div>

              <div className="course_info" style={{marginTop:"15px"}}>
                <div className="course_sub">course</div>
                <div>
                {course.crsTourInfo.replace(/<br>/gdi,"\n")}
                </div>
              </div>

              <div className="course_info">
                <div className="course_sub">contents</div>
                {course.crsContents.replace(/<br>/gdi,"\n")}
              </div>

              <div className="course_info">
                <div className="course_sub">traveler info</div>
                {course.travelerinfo.replace(/<br>/gdi,"\n")}
              </div>
            </div>
            </SwiperSlide>
          ))}
          </Swiper>
          </div>
        </div>
        }
      </div>
    </RecommendStyle>
  );
}

export default RecommendCourse;