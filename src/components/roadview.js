import React, { useEffect } from "react";
const { kakao } = window;
export default function Roadview({ views, geo, mapPoint }) {
  return (
    <div id="roadViews" style={{ display: views }}>
      <p>
        지도 위 원하는 곳을 클릭하면 <br /> 로드뷰를 볼 수 있습니다.
      </p>
    </div>
  );
}
