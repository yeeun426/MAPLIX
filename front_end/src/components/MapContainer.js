import React, { useEffect, useState } from 'react';
import { MdSmartDisplay } from 'react-icons/md';
import markerimg from '../img/marker.png'
import '../pages/Course.css'
const { kakao } = window;

// if activecate : setcardlist느낌으로


const MapContainer = ({activeCate, cardList, courselist}) => {

    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
  // var linePath = [
  //   new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
  //   new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
  //   new kakao.maps.LatLng(33.45178067090639, 126.5726886938753) 
  // ];

  // 지도에 표시할 선을 생성합니다
  // var polyline = new kakao.maps.Polyline({
  //   path: linePath, // 선을 구성하는 좌표배열 입니다
  //   strokeWeight: 5, // 선의 두께 입니다
  //   strokeColor: '#FFAE00', // 선의 색깔입니다
  //   strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
  //   strokeStyle: 'solid' // 선의 스타일입니다
  // });

  useEffect(() => {
    if (courselist.length > 0){
      
    }
  }, [courselist])



 
  // 검색결과 배열에 담아줌W
  useEffect(() => {
    if (cardList ){
      if (activeCate){
        console.log('코스리스트', courselist)  

        var mapContainer = document.getElementById('kakaoMap'), // 지도를 표시할 div  
            mapOption = { 
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 12 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        var imageSrc = markerimg, // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        // markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

        // // 마커를 생성합니다
        // var marker = new kakao.maps.Marker({
        //   position: markerPosition,
        //   image: markerImage // 마커이미지 설정 
        // });

        var position = []

        var geocoder = new kakao.maps.services.Geocoder();

        for (let i=0; i<cardList.length; i++) {

          geocoder.addressSearch(cardList[i].address, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
              
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              if (i === cardList.length - 1){
                position.push(result[0].y,  result[0].x)
              }
              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage // 마커이미지 설정 
              });

              var content = '<div className="customoverlay">' +
              '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
              '    <span>구의야구공원</span>' +
              '  </a>' +
              '</div>';

              // 마커에 표시할 인포윈도우를 생성합니다 
                var infowindow = new kakao.maps.InfoWindow({
                //content: positions[i].content // 인포윈도우에 표시할 내용
                // content: content
                
                content: '<div class="infowindow_text" style="width:170px;text-align:center;padding:6px 0;">'+ cardList[i].p_name +'</div>' // 인포윈도우에 표시할 내용
              });
              //infowindow.open(map, marker);
              kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
              kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
              //지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords)
            }
          });
        }

        // var final_coords = new kakao.maps.LatLng(position[0], position[1]);

        // map.setCenter(final_coords);

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
          return function() {
              infowindow.open(map, marker);
          };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
          return function() {
              infowindow.close();
          };
        }        
      } 
    } 
  });

    return (
        <div
          id="kakaoMap"
          style={{
            height: '1020px',
          }}></div>
    );
  } 

export default MapContainer