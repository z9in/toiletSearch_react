import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Map, MapMarker, Roadview } from "react-kakao-maps-sdk";
import kyunggi2 from "./kyunggi_toilets.json";
import Search from "./components/search";
import Btns from "./components/btns";
const { kakao } = window;
function App() {
  const [geo, setGeo] = useState([{ lat: 37.566826, lng: 126.9786567 }]);
  const [position, setPosition] = useState([
    { lat: 37.566826, lng: 126.9786567 },
  ]);
  const [region, setRegion] = useState("경기도 안양");
  const [views, setViews] = useState("none");
  const [markers, setMarkers] = useState([]);
  const getGeo = useRef();
  const viewsfunc = function () {
    if (views == "none") {
      setViews("block");
    } else {
      setViews("none");
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let new_geo = [
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        ];
        setGeo(new_geo);
        setPosition(new_geo);
      });
    } else {
      alert("no geolocation support");
    }
  }, []);
  useEffect(() => {
    let arr = [];
    kyunggi2.map((e) => {
      if (e.REFINE_LOTNO_ADDR.indexOf(region) > -1) {
        arr.push(e);
      }
    });
    setMarkers(arr);
  }, [region]);
  return (
    <div className="containers">
      <h1>내 주변 공중화장실</h1>
      <div className="mapsRange">
        <Map
          id="mapViews"
          center={{
            lat: geo[0].lat,
            lng: geo[0].lng,
          }}
          level={3}
          onClick={(_t, mouseEvent) =>
            setPosition([
              {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
            ])
          }
        >
          {markers.map((position, index) => (
            // console.log(position.lat)
            <MapMarker
              key={index}
              position={{
                lat: position.REFINE_WGS84_LAT,
                lng: position.REFINE_WGS84_LOGT,
              }} // 마커를 표시할 위치
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35,
                }, // 마커이미지의 크기입니다
              }}
              title={position.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            />
          ))}
        </Map>
        <Roadview
          id="roadViews"
          position={{
            // 지도의 중심좌표
            lat: position[0].lat,
            lng: position[0].lng,
            radius: 50,
          }}
          style={{
            display: views,
          }}
        ></Roadview>
      </div>
      <Search
        setGeo={setGeo}
        setRegion={setRegion}
        getGeo={getGeo}
        kakao={kakao}
      />
      <Btns
        setGeo={setGeo}
        setRegion={setRegion}
        viewsfunc={viewsfunc}
        kakao={kakao}
      />
    </div>
  );
}

export default App;
