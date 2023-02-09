import "./App.css";
import { useState, useEffect, useRef } from "react";
import kyunggiToilet from "./kyunggi_toilets.json";
const { kakao } = window;
const { geolocation } = navigator;
function App() {
  const [geo, setGeo] = useState("안양시 장내로125번길");
  const [views, setViews] = useState("none");
  // setGeo('바뀜')
  const getGeo = useRef();

  useEffect(() => {
    const mapViewsEl = document.getElementById("mapViews");
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(geo, search);
    function search(result, status) {
      const options = {
        center: new kakao.maps.LatLng(result[0].y, result[0].x),
        level: 3,
      };
      const map = new kakao.maps.Map(mapViewsEl, options);
      let coords = kyunggiToilet.map((e) => [
        {
          title: e.PBCTLT_PLC_NM,
          lat1: e.REFINE_WGS84_LAT,
          lat2: e.REFINE_WGS84_LOGT,
        },
      ]);
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      for (var i = 0; i < coords.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(20, 30);
        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        // 마커를 생성합니다
        new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          title: coords[i][0].title,

          position: new kakao.maps.LatLng(coords[i][0].lat1, coords[i][0].lat2), // 마커를 표시할 위치
          image: markerImage, // 마커 이미지
        });
      }
    }

    // let roadViewsEl = document.getElementById("roadViews");
    // let roadView = new kakao.maps.Roadview(roadViewsEl);
    // let roadViewClient = new kakao.maps.RoadviewClient();
    // let position = new kakao.maps.LatLng();
  }, [geo]);

  return (
    <div className="containers">
      <h1>내 주변 공중화장실</h1>
      {/* 지도 그리기 */}
      <div className="mapsRange">
        <div id="mapViews">
          <p>지도를 로드하는 중입니다.</p>
        </div>
        <div id="roadViews" style={{ display: views }}></div>
      </div>

      {/* 검색 입력 */}
      <div className="sendBox">
        <input
          type="text"
          ref={getGeo}
          id="input"
          placeholder="검색하고 싶은 지역을 입력하세요"
        />
        <input
          id="submit"
          type="submit"
          value="발송"
          onClick={() => {
            // console.log(getGeo.current.value)
            setGeo(getGeo.current.value);
            getGeo.current.value = "";
          }}
        />
      </div>
      {/* 편의 기능 버튼 */}
      <div className="btns">
        <button
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                function (position) {
                  console.log("완료");
                },
                function (error) {
                  console.log("문제있음");
                  setGeo("군포시");
                },
                { timeout: 1000 }
              );
            } else {
              alert("no geolocation support");
            }
          }}
        >
          현재 위치
        </button>
        <button
          onClick={() => {
            console.log(views);
            if (views == "none") {
              setViews("block");
            } else {
              setViews("none");
            }
          }}
        >
          로드뷰 보기
        </button>
        <button>거리 보기</button>
      </div>
    </div>
  );
}

export default App;
