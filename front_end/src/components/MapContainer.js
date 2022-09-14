import React, { useEffect, useState } from 'react';
import { MdSmartDisplay } from 'react-icons/md';

import markerimg from '../img/기본마커.png'
import source1 from '../img/마커1.png'
import source2 from '../img/마커2.png'
import source3 from '../img/마커3.png'
import source4 from '../img/마커4.png'
import source5 from '../img/마커5.png'
import source6 from '../img/마커6.png'
import source7 from '../img/마커7.png'
import source8 from '../img/마커8.png'
import source9 from '../img/마커9.png'

import '../pages/Course.css'
const { kakao } = window;

// if activecate : setcardlist느낌으로


const MapContainer = ({activeCate, cardList, courselist, pagename}) => {
 
  // 검색결과 배열에 담아줌W
  useEffect(() => {
    
    if (cardList ){
      if (activeCate){

        var mapContainer = document.getElementById('kakaoMap'), // 지도를 표시할 div  
        mapOption = { 
            center: new kakao.maps.LatLng(37.26393217901178, 127.07476629248039), // 지도의 중심좌표
            level: 12 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        
        var imageSize = new kakao.maps.Size(45, 45); // 마커이미지의 크기입니다
        var imageOption = {offset: new kakao.maps.Point(25, 45)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(markerimg, imageSize, imageOption)
        var marker1 = new kakao.maps.MarkerImage(source1, imageSize, imageOption)
        var marker2 = new kakao.maps.MarkerImage(source2, imageSize, imageOption)
        var marker3 = new kakao.maps.MarkerImage(source3, imageSize, imageOption)
        var marker4 = new kakao.maps.MarkerImage(source4, imageSize, imageOption)
        var marker5 = new kakao.maps.MarkerImage(source5, imageSize, imageOption)
        var marker6 = new kakao.maps.MarkerImage(source6, imageSize, imageOption)
        var marker7 = new kakao.maps.MarkerImage(source7, imageSize, imageOption)
        var marker8 = new kakao.maps.MarkerImage(source8, imageSize, imageOption)
        var marker9 = new kakao.maps.MarkerImage(source9, imageSize, imageOption)

        for (let i=0; i<cardList.length; i++) {
          var coords = new kakao.maps.LatLng(cardList[i].p_y, cardList[i].p_x)
          displayMarker(cardList[i])
        }

        //map.setCenter(new kakao.maps.LatLng(cardList[i].p_y, cardList[i].p_x))

        // 지도에 마커를 표시하는 함수입니다    
        function displayMarker(data) { 
          var marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(data.p_y, data.p_x),
              image : markerImage
          });

          var content = document.createElement('div');
          content.className = 'customoverlay'

          var content2 = document.createElement('div');
          content2.className = 'title'
          content2.appendChild(document.createTextNode(data.p_name));

          content.appendChild(content2);
         
          var closeBtn = document.createElement('button');
          closeBtn.appendChild(document.createTextNode('✖'));
          // 닫기 이벤트 추가
          closeBtn.onclick = function() {
              overlay.setMap(null);
          };

          content.appendChild(closeBtn);

          var overlay = new kakao.maps.CustomOverlay({
              map: map,
              content: content,
              yAnchor: 0.5,
              position: marker.getPosition()
          });

          overlay.setMap(null);
          kakao.maps.event.addListener(marker, 'click', function() {
              overlay.setMap(map);
          });

          //map.setCenter(new kakao.maps.LatLng(data.p_y, data.p_x));
        }        
        
        var linePath = [];
        // var betweenPath = [];

        console.log('코스 들어옴', courselist)
      
        for (let i=0; i<courselist.length; i++) {
          if (courselist[i].course !== null){
            linePath.push(new kakao.maps.LatLng(courselist[i].course.p_y, courselist[i].course.p_x))

            var curimg;
            if (i === 0){
              curimg = marker1;
            }else if (i === 1){
              curimg = marker2;
            }else if (i === 2){
              curimg = marker3;
            }else if (i === 3){
              curimg = marker4;
            }else if (i === 4){
              curimg = marker5;
            }else if (i === 5){
              curimg = marker6;
            }else if (i === 6){
              curimg = marker7;
            }else if (i === 7){
              curimg = marker8;
            }else if (i === 8){
              curimg = marker9;
            }
            
            var coursemarker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new kakao.maps.LatLng(courselist[i].course.p_y, courselist[i].course.p_x), // 마커의 위치
              image : curimg
            });

            coursemarker.setMap(map)
          }         
        }  


        var polyline = new kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: '#d95050', // 선의 색깔입니다
          strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid' // 선의 스타일입니다
        });

        polyline.setMap(map);
     
      } 
    } 
  }, );



    return (
      <div>
        {pagename === 'LikeList' ? 
        <div id="kakaoMap" style={{height: '450px',}}></div> 
        :
        <div id="kakaoMap" style={{height: '1050px',}}></div> 
      }
      </div>
        
    );
  }

export default MapContainer