import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  // 검색결과 배열에 담아줌W
    useEffect(() => {
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
      var markers = [] // 마커를 담을 배열
      const container = document.getElementById('kakaoMap')
      const options = {
        center: new kakao.maps.LatLng(35.85133, 127.734086), // 지도의 중심좌표
        level: 12, // 지도의 확대 레벨
      }
      const ps = new kakao.maps.services.Places(); //장소 검색 객체를 생성
      const map = new kakao.maps.Map(container, options)
      
      ps.keywordSearch(searchPlace, placesSearchCB)

      // 장소검색이 완료됐을 때 호출되는 콜백함수
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료되면
          // 검색된 장소 위치를 기준으로 지도 범위 재설정 -> LatLng 객체에 좌표 추가
          let bounds = new kakao.maps.LatLngBounds()
          
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]) //마커 표출
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
  
          map.setBounds(bounds)
          // 페이지 목록 보여주는 displayPagination() 추가
          displayPagination(pagination);
          // setPlaces(data)
        }
      }
      //지도에 마커를 표시
      function displayMarker(place) {
        //마커 생성하고 지도에 표시
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });
        //마커에 클릭이벤트 
        kakao.maps.event.addListener(marker, 'click', function () {
          //마커를 클릭하면 장소명이 인포윈도우에 뜸
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
          infowindow.open(map, marker)
        });
      }
    }, [searchPlace]);
    
      // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }
        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }
  
    return (
        <div
          id="kakaoMap"
          style={{
            height: '1000px',
          }}></div>
    );
  } 

export default MapContainer