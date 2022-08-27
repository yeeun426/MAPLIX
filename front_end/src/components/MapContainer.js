import React, { useEffect, useState } from 'react';

const { kakao } = window;

// if activecate : setcardlist느낌으로


const MapContainer = ({activeCate, cardList, setCardList}) => {
 
  // 검색결과 배열에 담아줌W
  useEffect(() => {
    if (cardList ){
      if (activeCate){  

        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        var markers = [] // 마커를 담을 배열
        const container = document.getElementById('kakaoMap')
        const options = {
          center: new kakao.maps.LatLng(35.85133, 127.734086), // 지도의 중심좌표
          level: 12, // 지도의 확대 레벨
        }
        var map = new kakao.maps.Map(container, options)

        let nowcate = "";

        for (var k=0; k < activeCate.length; k++){
          if (Object.values(activeCate)[k].flag === true){
            nowcate = Object.values(activeCate)[k].realCate
          }
        }

        // 즐겨찾기, 촬영지는 cardlist에서 뽑아오기
        if (nowcate === '즐겨찾기' || nowcate === '촬영지'){ 
          //var map = new kakao.maps.Map(container, options)
          var final_coords = new kakao.maps.LatLng(35.85133, 127.734086);

          for (var i = 0; i < cardList.length; i ++) {
            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();
            // 주소로 좌표를 검색합니다

            var m = cardList[i].p_name

            geocoder.addressSearch(cardList[i].address, function(result, status) {
              // 정상적으로 검색이 완료됐으면 
              if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          
                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                  map: map,
                  position: coords
                });
                

                // 마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' +  + '</div>');
                infowindow.open(map, marker);
                });
                
                var infowindow = new kakao.maps.InfoWindow({
                  content: '<div style="width:150px;text-align:center;padding:6px 0;"></div>'
                });

                infowindow.open(map, marker);
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              
              }
              final_coords.maps.LatLng(result[0].y, result[0].x);
            });
              
          }
          map.setCenter(final_coords); 
        
          // 산, 숲 등등 카카오 카테고리라면------------------------------------------------------------
        }else{
          //setCardList()
          var ps = new kakao.maps.services.Places(); 

          ps.keywordSearch(nowcate , placesSearchCB); 

          

          function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
              console.log(data)
              const newnew = []
              for (var a=0; a < data.length; a++){
                newnew.push({address : data[a].address_name, category : nowcate, p_name : data[a].place_name, p_num : a})
              }

              setCardList(newnew);
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가합니다
              var bounds = new kakao.maps.LatLngBounds();
      
              for (var i=0; i<data.length; i++) {
                  displayMarker(data[i]);    
                  bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }

              // const newcardlist = cardList.map((k, index) => {like_num : index})
              // setCardList(data)       
        
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
              map.setBounds(bounds);
            } 
          }

          function displayMarker(place) {
    
            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });
        
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
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