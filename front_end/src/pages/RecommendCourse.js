import styles from "./RecommendCourse.module.css"
import React, { useState } from "react";

import Jeju from './JejuCourse';
import Gangneung from './GangneungCourse';
import Incheon from './IncheonCourse';
import Jeonju from './JeonjuCourse';
import Busan from './BusanCourse';

import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination]);

function RecommendCourse() {
  const [content, setContent] = useState();

  const buttonValueSetting = e => {
      const { name } = e.target; //클릭한 버튼의 name값을 state에 저장
      setContent(name);
  };

  const selectComponent = {
    Jeonju: <Jeonju />,
    Gangneung: <Gangneung />,
    Incheon: <Incheon />,
    Jeju: <Jeju />,
    Busan: <Busan />,
  };

  console.log(content);

  return (
    <div className="RecommendCourse">
        <div id={styles.title}>
          Recommended course 
          <br/>for filming location
        </div>

        <div>
          TV, 영화 속 한 장면을 찾아 떠나는 지역 별 여행 코스
        </div>

        <div className={styles.area_category}>
          <button className={styles.area_name} onClick={buttonValueSetting}>
            #전주
          </button>

          <button className={styles.area_name} onClick={buttonValueSetting}>
            #부산
          </button>

          <button className={styles.area_name} onClick={buttonValueSetting}>
            #수원
          </button>

          <button className={styles.area_name} onClick={buttonValueSetting}>
            #제주
          </button>

          <button className={styles.area_name} onClick={buttonValueSetting}>
            #강릉
          </button>

          <button className={styles.area_name} onClick={buttonValueSetting}>
            #대구
          </button>
          
          <button className={styles.area_name} onClick={buttonValueSetting}>
            #포항
          </button>

          <button className={styles.area_name} onClick={buttonValueSetting}>
            #인천
          </button>
        </div>

        <div className={styles.container}>
          <div className={styles.course_num}>
            <div style={{border:"1px dashed black", width: "700px"}}></div>
            <div>
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>5</button>
            </div>
          </div>

        <div className={styles.upper_container}>
          <Swiper
            spaceBetween={1}
            slidesPerView={4}
            slidesPerGroup={1}
            navigation
            pagination={{clickable: true}}
          >
            <SwiperSlide>
              <div style={{position: 'relative'}}>
                <img alt="img_filming" src="https://a.cdn-hotels.com/gdcs/production183/d578/c34b116d-a40f-4d3b-ad93-18bdad947eae.jpg?impolicy=fcrop&w=1600&h=1066&q=medium"/>
                <div className={styles.course_name}>메이즈랜드</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img alt="img_filming" src="https://api.cdn.visitjeju.net/photomng/imgpath/202110/28/b0befdd7-01bf-4057-b4f1-e4bba3a60994.jpg"/>
              <div className={styles.course_name}>성이시돌목장</div>
            </SwiperSlide>
            <SwiperSlide>
              <img alt="img_filming" src="https://a.cdn-hotels.com/gdcs/production159/d1168/105deb24-b0fa-457d-bd8a-2b1dec405993.jpg?impolicy=fcrop&w=1600&h=1066&q=medium"/>
              <div className={styles.course_name}>물영아리오름</div>
            </SwiperSlide>
            <SwiperSlide>
              <img alt="img_filming" src="https://pbs.twimg.com/media/D6BMSjGUYAA0sS2.jpg"/>
              <div className={styles.course_name}>바당고지</div>
            </SwiperSlide>
            <SwiperSlide>
              <img alt="img_filming" src="https://mblogthumb-phinf.pstatic.net/MjAyMDA1MDFfMTAy/MDAxNTg4Mjg5ODI0Mzc3.ibWM8y7kgezDj5Bg_vL6Wkl8SrmEbJbkMB8hH14spUUg.GRILa4jYQzDF2b-fVCTrYMMscIAVMVf-SjJ9BM7CWUwg.JPEG.ehflfl2/DJI_0261.jpg?type=w800"/>
              <div className={styles.course_name}>금능해수욕장</div>
            </SwiperSlide>

          </Swiper>
          </div>

          <div className={styles.bottom_container}>
            <div className={styles.detail_box}>
              <div id={styles.detail_title}>4. 바당고지</div>
              <span>제주 제주시 한림읍 협재로6</span>
              <span style={{margin:"0 10px"}}>|</span>
              <span>하트 시그널 시즌3</span>
              <div className={styles.detail_img}>
                <img alt="detail_img" style={{"margin-right":"30px"}} src="https://mblogthumb-phinf.pstatic.net/MjAyMDA3MDJfMTcg/MDAxNTkzNjY2MjIzNjE5.AUiCNW0WHdSScBm1qFfbsIFRD1cwfy9oc-ae2qt9M3kg.tWtfLxH8pqT94mugCKossJYO7rfF-L0sXf1lyiJ_Fywg.JPEG.muhwa0/%ED%95%98%ED%8A%B8%EC%8B%9C%EA%B7%B8%EB%84%90%EC%8B%9C%EC%A6%8C3-%EA%B9%80%EA%B0%95%EC%97%B4-%EB%B0%95%EC%A7%80%ED%98%84-%ED%9D%91%EB%8F%BC%EC%A7%80-%EA%B3%A0%EA%B8%B0%EC%A7%91-%EB%B0%94%EB%8B%B9%EA%B3%A0%EC%A7%802.jpg?type=w800"></img>
                <img alt="detail_img" style={{"margin-right":"30px"}} src="https://t1.daumcdn.net/cfile/tistory/999E434D5F04723F0B"/>
                <img alt="detail_img" src="https://mblogthumb-phinf.pstatic.net/MjAxOTA4MDdfNzEg/MDAxNTY1MTQ4Nzg1MTkw.IgjTi-QJyZYs8_vZ0_AR3MWMh3UPQZh8oUJbW1qVY_Mg.d-dOM4IFHcS0neGdhdBqC8aJROf-hIoVnRbNRwU7Hq8g.JPEG.thormommy/SAM_6692.jpg?type=w800"/>
              </div>
            </div>
          </div>

          <div className={styles.bottom_txt}>
            ※ 위 정보는 2022년 7월에 작성된 정보로, 이후 변경될 수 있으니 여행 하시기 전에 반드시 확인하시기 바랍니다.
          </div>
        </div>
    </div>
  );
}

export default RecommendCourse;