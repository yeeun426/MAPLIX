import React, { useEffect, useState } from 'react';

const { kakao } = window;

// if activecate : setcardlist느낌으로


const MapContainer = ({activeCate, cardList, setCardList}) => {
 
  // 검색결과 배열에 담아줌W
  useEffect(() => {
    if (cardList ){
      if (activeCate){  

        // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        var markers = [] // 마커를 담을 배열

        var position = [];
        var place_name = [];
        const container = document.getElementById('kakaoMap')
        const options = {
          center: new kakao.maps.LatLng(35.85133, 127.734086), // 지도의 중심좌표
          level: 12, // 지도의 확대 레벨
        }
        // var map = new kakao.maps.Map(container, options)

    //     // 주소-좌표 변환 객체를 생성합니다
    //     var geocoder = new kakao.maps.services.Geocoder();
    //     for (var i = 0; i < cardList.length; i ++) {
            
    //       // 주소로 좌표를 검색합니다
    //       geocoder.addressSearch(cardList[i].address, function(result, status) {
    //         // 정상적으로 검색이 완료됐으면 
    //         if (status === kakao.maps.services.Status.OK) {
    //           var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //           position.push(coords);
    //         }
    //       });
    //       place_name.push(cardList[i].p_name);
    //     };

    //     console.log('엑스와이 배열', position);

    //     var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    //     for (var i=0; i < position.length; i ++){
    //       var imageSize = new kakao.maps.Size(24, 35); 
    //        // 마커 이미지를 생성합니다    
    //       var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    //       // 마커를 생성합니다
    //       var marker = new kakao.maps.Marker({
    //         map: map, // 마커를 표시할 지도
    //         position: position[i].qa, // 마커를 표시할 위치
    //         title : place_name[i], // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //         image : markerImage // 마커 이미지 
    //       });


          
    //     }

        
    //   }
    // }  

    

        //즐겨찾기, 촬영지는 cardlist에서 뽑아오기
        if (true){ 
          var map = new kakao.maps.Map(container, options)

          for (var i = 0; i < cardList.length; i ++) {
            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();
            // 주소로 좌표를 검색합니다

            geocoder.addressSearch(cardList[i].address, function(result, status) {
              // 정상적으로 검색이 완료됐으면 
              if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          
                // 결과값으로 받은 위치를 마커로 표시합니다
                
                var temp = new kakao.maps.Marker({
                  map: map,
                  position: coords
                });

                markers.push(temp)

                
              }
            });   
          }

          for (var j = 0; j < markers.length; j ++){
        // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(markers[j], 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + + '</div>');
            infowindow.open(map, markers[j]);
            });
            
            var infowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;"></div>'
            });

            infowindow.open(map, markers[i]);
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            // map.setCenter(coords); 
          }


          
          
        }
          
      } 
    } 
  });

    return (
        <div
          id="kakaoMap"
          style={{
            height: '1000px',
          }}></div>
    );
  } 

export default MapContainer