import React from "react";
import { useState, useEffect, useRef } from "react";
import Roadview from "./roadview";
import logo from "../images/logo.svg";
const { kakao } = window;

export default function Maps({ geo, setMapPoint, views, mapPoint, zIndexNum }) {
  return (
    <div className="mapsRange">
      <div id="mapViews">
        <div
          className="mapLoading"
          style={{
            zIndex: zIndexNum,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            width: "100%",
            height: "100%",
            textAlign: "center",
            paddingTop: "40%",
            fontSize: "1.5em",
          }}
        >
          <img src={logo} width="50px" alt="로고" />
          <p style={{ marginTop: "20px" }}>지도를 불러오고 있습니다.</p>
        </div>
      </div>
      <Roadview views={views} geo={geo} mapPoint={mapPoint} />
    </div>
  );
}
