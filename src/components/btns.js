import React from "react";

const { kakao } = window;

export default function Btns({ setGeo, views, setViews, setZIndex }) {
  return (
    <div className="btns">
      <button
        onClick={() => {
          setZIndex(3);
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
  );
}
