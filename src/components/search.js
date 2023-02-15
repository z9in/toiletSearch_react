import React from "react";

export default function Search({ setGeo, setRegion, getGeo, kakao }) {
  return (
    <div className="sendBox">
      <input
        type="text"
        ref={getGeo}
        id="input"
        placeholder="검색 예: 안양시 만안구 안양동"
      />
      <input
        id="submit"
        type="submit"
        value="발송"
        onClick={() => {
          let new_region = `경기도 ${getGeo.current.value}`;
          var geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(
            getGeo.current.value,
            function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                let new_geo = [
                  {
                    lat: coords.Ma,
                    lng: coords.La,
                  },
                ];
                setGeo(new_geo);
                setRegion(new_region);
              }
            }
          );

          getGeo.current.value = "";
        }}
      />
    </div>
  );
}
