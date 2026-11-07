// 설정 예시 파일 — 이 파일을 복사해 config.js로 저장한 뒤 주소를 채워 넣으세요.
//   cp config.example.js config.js
// config.js에는 내부망 IP·터널 주소가 들어가므로 깃에 올리지 않습니다 (.gitignore).
//
// 페이지를 어디서 열었는지에 따라 서버 주소를 고름
//  · 로컬(localhost·내부망)에서 열면  → 내부망 서버 + UE5 드론 화면
//  · Vercel 등 외부 주소에서 열면     → 서버 담당자의 터널 주소 (게스트 조회용), 드론 화면 없음
const ADDR = {
  local:  { api: "http://<서버 PC IP>:8000", ps: "ws://<UE5 PC IP>" },
  remote: { api: "https://<터널 주소>",      ps: "" },   // 터널 주소는 서버를 다시 켜면 바뀜 → 바뀌면 고치고 다시 배포
};
const IS_LOCAL = /^(localhost|127\.0\.0\.1|\[::1\]|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(location.hostname) || location.protocol === "file:";
const PICK = IS_LOCAL ? ADDR.local : ADDR.remote;

window.APP_CONFIG = {
  API_URL: PICK.api,   // NEXT_PUBLIC_API_URL
  PS_URL: PICK.ps,     // NEXT_PUBLIC_PS_URL (UE5 PC Pixel Streaming) — Vercel에서는 비워 둠
  STRUCTURE_ID: 1,
  DRONE_MODEL_URL: "/files/assets/drone.glb",   // 서버의 드론 3D 모델 (API_URL 뒤에 붙여 불러옴)
  // Skybay 건물 액터의 UE5 월드 트랜스폼 (cm, 도). 웹 GLB는 건물 로컬 좌표를 사용.
  CRACK_MODEL_FRAME: {
    origin: {x: 49829.813107, y: 112857.88768, z: 6459.375901},
    yawDeg: 42.378503,
  },
  // 균열의 건물 로컬 좌표(cm) → "S동 4층" 같은 위치 이름으로 바꾸는 기준 (스카이베이 경포: 지상 20층 타워 2개)
  // ⚠ 어느 쪽이 S동인지, 층 높이는 디지털 트윈팀 확인 후 고칠 것 (지금은 3D 모델 기준 추정값)
  BUILDING: {
    splitAxis: "x",     // 두 동을 가르는 UE5 축
    splitAt: 0,         // 가르는 위치 (cm)
    negSide: "S",       // splitAxis 값이 splitAt보다 작은 쪽
    posSide: "N",       // 큰 쪽
    groundZ: 0,         // 1층 바닥 높이 (UE5 z, cm)
    floorHeight: 460,   // 층 높이 (cm)
    floors: 20,         // 지상 층수
    northDeg: 0,        // 3D 바람 효과의 북쪽 보정(도)
  },
};
