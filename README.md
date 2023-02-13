# 내 주변 공중화장실 검색 - 경기도

### 2023.02.13.
- 오류 수정 
    - 현재위치 버트 클릭시 오류 발생 => 사용자 위치확인 권한 허용
    - app.json 내에 다음의 내용 첨부("permissions": ["ACCESS_FINE_LOCATION"])
   ![image](https://user-images.githubusercontent.com/113665653/218359711-6c191322-2396-48a3-92bc-35c0f72a3f6b.png)
    
    - 앱 구동 시 상단의 상태표시줄과 겹침현상 발생
    - StatusBar 콤포넌트 추가하여 해결
    
    import { StatusBar } from "expo-status-bar";

    ![image](https://user-images.githubusercontent.com/113665653/218359590-810830c0-8ad3-4b12-b2f3-6c3b2b397888.png)


- 기능 보완
    - 지역 검색 중, '로딩 중' 이미지 반영            
        ![크기변환 KakaoTalk_20230213_141006490](https://user-images.githubusercontent.com/113665653/218376051-ef03b292-1c06-4ea3-851d-d5bc325a202d.jpg)




### 2023.02.10.

## 1. 추가 및 수정/보완 기능 명세

#### 기존 버전 코드 : https://github.com/z9in/toilet_around_me
- HTML 및 CSS, JAVASCRIP로 작성
- 공공데이터 활용 : 경기도 공중화장실 위치 데이터
- 카카오 MAP API활용 

#### 수정/보완 실행 : https://web-toiletsearch-react-422t024lbonwoan.gksl2.cloudtype.app/
- REACT로 재작성
- 디자인 수정 : 
    - 기본 지도 크기 증가
    - 로드뷰를 기본 지도 위에 오버레이
    - 로드뷰 버튼, 현재 위치 버튼 추가

- 기능 추가 :
    - 로드뷰 버튼 클릭 시 로드뷰 오버레이 켜짐 및 꺼짐
    - 현재 위치 버튼 클릭 시 현재 위치로 지도 중심 이동


- 앱 다운로드 : https://expo.dev/artifacts/eas/5rReVcQLURseb3rvbN8ubz.apk

![Frame 1](https://user-images.githubusercontent.com/113665653/218007936-4f8f791f-20ea-446e-a7ff-b5e496059b34.jpg)
