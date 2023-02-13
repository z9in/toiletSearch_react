import React from "react";
import { useRef } from "react";

export default function Search({ setGeo, setZIndex }) {
  const getGeo = useRef();
  return (
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
          setZIndex(3);
          setGeo(getGeo.current.value);
          getGeo.current.value = "";
        }}
      />
    </div>
  );
}
