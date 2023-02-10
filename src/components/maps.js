import React from "react";
import { useState, useEffect, useRef } from "react";
import Roadview from "./roadview";
const { kakao } = window;

export default function Maps({ geo, setMapPoint, views, mapPoint }) {
  return (
    <div className="mapsRange">
      <div id="mapViews">
        <p>지도를 로드하는 중입니다.</p>
      </div>
      <Roadview views={views} geo={geo} mapPoint={mapPoint} />
    </div>
  );
}
