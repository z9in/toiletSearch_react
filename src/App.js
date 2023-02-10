import "./App.css";
import { useState, useEffect, useRef } from "react";
import kyunggiToilet from "./kyunggi_toilets.json";
const { kakao } = window;
const { geolocation } = navigator;
function App() {
  const [geo, setGeo] = useState("안양시 장내로125번길");
  const [mapPoint, setMapPoint] = useState([]);
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
      setMapPoint(map);
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
      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;

        var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
        message += "경도는 " + latlng.getLng() + " 입니다";

        var roadviewContainer = document.getElementById("roadViews"); //로드뷰를 표시할 div
        var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
        var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

        var position = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng());

        // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
        roadviewClient.getNearestPanoId(position, 50, function (panoId) {
          roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        });
      });
    }
  }, [geo]);

  return (
    <div className="containers">
      <h1>내 주변 공중화장실</h1>
      {/* 지도 그리기 */}
      <div className="mapsRange">
        <div id="mapViews">
          <p>지도를 로드하는 중입니다.</p>
        </div>
        <div id="roadViews" style={{ display: views }}>
          <p>
            지도 위 원하는 곳을 클릭하면 <br /> 로드뷰를 볼 수 있습니다.
          </p>
        </div>
      </div>

      {/* 검색 입력 */}
      <div className="sendBox">
        <input
          type="text"
          ref={getGeo}
          id="input"
          placeholder="검색하고 싶은 곳의 주소를 입력하세요"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "NumpadEnter") {
              setGeo(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <input
          id="submit"
          type="submit"
          value="발송"
          onClick={() => {
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
                  var geocoder = new kakao.maps.services.Geocoder();
                  var coord = new kakao.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                  );
                  var callback = function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                      setGeo(result[0].address.address_name);
                    }
                  };
                  geocoder.coord2Address(
                    coord.getLng(),
                    coord.getLat(),
                    callback
                  );
                },
                function (error) {
                  console.log("문제있음");
                  setGeo("안양시 장내로125번길");
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
            if (views == "none") {
              setViews("block");
            } else {
              setViews("none");
            }
          }}
        >
          로드뷰 보기
        </button>
      </div>
    </div>
  );
}

export default App;
