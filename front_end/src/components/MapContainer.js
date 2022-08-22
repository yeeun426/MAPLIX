import React, { useEffect } from 'react';

const { kakao } = window;


const MapContainer = (props) => {

  const {activeCate} = props;
  const {cardList} = props;
 
  // 검색결과 배열에 담아줌W
  useEffect(() => {
    if (cardList){
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
      var markers = [] // 마커를 담을 배열
      const container = document.getElementById('kakaoMap')
      const options = {
        center: new kakao.maps.LatLng(35.85133, 127.734086), // 지도의 중심좌표
        level: 12, // 지도의 확대 레벨
      }
      //const ps = new kakao.maps.services.Places(); //장소 검색 객체를 생성
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
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords
            });
            
            var infowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;"></div>'
          });
          infowindow.open(map, marker);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
          } 
        });   
      }
    };
  }, [cardList]);
    
    //   // 검색결과 목록 하단에 페이지 번호 표시
    // function displayPagination(pagination) {
    //   var paginationEl = document.getElementById('pagination'),
    //     fragment = document.createDocumentFragment(),
    //     i

    //   // 기존에 추가된 페이지 번호 삭제
    //   while (paginationEl.hasChildNodes()) {
    //     paginationEl.removeChild(paginationEl.lastChild)
    //   }

    //   for (i = 1; i <= pagination.last; i++) {
    //     var el = document.createElement('a')
    //     el.href = '#'
    //     el.innerHTML = i

    //     if (i === pagination.current) {
    //       el.className = 'on'
    //     } else {
    //       el.onclick = (function (i) {
    //         return function () {
    //           pagination.gotoPage(i)
    //         }
    //       })(i)
    //     }
    //     fragment.appendChild(el)
    //   }
    //   paginationEl.appendChild(fragment)
    // }
  
    return (
        <div
          id="kakaoMap"
          style={{
            height: '1000px',
          }}></div>
    );
  } 

export default MapContainer