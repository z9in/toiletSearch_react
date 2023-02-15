import React from "react";
export default function Btns({ setGeo, kakao, setRegion, viewsfunc }) {
  return (
    <div className="btns">
      <button
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              let new_geo = [
                {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              ];
              setGeo(new_geo);
              var geocoder = new kakao.maps.services.Geocoder();
              geocoder.coord2Address(
                new_geo[0].lng,
                new_geo[0].lat,
                function (result) {
                  let new_region =
                    "경기도 " + result[0].address.region_2depth_name;

                  setRegion(new_region);
                }
              );
            });
          }
        }}
      >
        현재 위치
      </button>
      <button onClick={viewsfunc}>로드뷰 보기</button>
    </div>
  );
}
