// ===== 아트보드 (1920×1080, 첨부 시안에서 측정) =====
const W = 1920;
const H = 1080;

// ===== 시계 레이아웃 =====
const CLOCK_X = 960;      // 시계 중심
const CLOCK_Y = 540;
const TILE = 229.6;       // 검은 사각형 한 칸 크기 = 눈 간격

// 12시부터 시계방향으로 각 눈의 위치 (TILE 단위, 시계 중심 기준)
const HOUR_POS = [
  [0, -1.5], [1, -1.3], [2, -0.8], [3, 0], [2, 0.8], [1, 1.3],
  [0, 1.5], [-1, 1.3], [-2, 0.8], [-3, 0], [-2, -0.8], [-1, -1.3],
];

// 눈 그래픽은 원본(눈 간격 281.25px) 치수 그대로 두고 이 배율로 줄여서 그림
const EYE_SCALE = TILE / 281.25;

// ===== 가시: 사각형 바깥쪽 변에서 뻗어나가는 가늘어지는 선 =====
const SPIKE_COUNT = 17;
const SPIKE_LEN = 67;       // 사각형 변에서 끝까지 길이
const SPIKE_BASE = 3.6;     // 뿌리 쪽 굵기
const SPIKE_INSET = 12;     // 사각형 양 끝에서 들여쓴 거리
const EDGE_SPIKE_LEN = 71;  // 화면 양쪽 끝 가로 가시 길이
const EDGE_SPIKE_BASE = 5;  // 〃 화면 끝 쪽 굵기


// ===== 색상 =====
const C_BG = '#FFFFFF';
const C_PANEL = '#000000';
const C_RED = '#DE004F';
const C_WHITE = '#FFFFFF';
const C_BLUE = '#00A9DC';
const C_PUPIL = '#000000';

// ===== 눈 내부 치수 (눈 중심 기준, 원본 배율) =====
const IRIS_R = 56.2;   // 파란 홍채 반지름
const PUPIL_R = 39.75; // 동공 반지름
const HL_X = 29.5;     // 하이라이트 오프셋
const HL_Y = -33.6;
const HL_R = 14.9;     // 하이라이트 반지름

// ===== 동공 속 숫자 (원본 배율) =====
const C_NUM = '#FFFFFF';
const NUM_FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const NUM_SIZE_1 = 44;    // 한 자리 숫자 크기
const NUM_SIZE_2 = 36;    // 두 자리 숫자(10, 11, 12) 크기
const NUM_OFFSET_Y = 3;   // 세로 가운데 맞춤 보정

// 빨간 테두리 / 흰자 윤곽: 눈 중심에서 1° 간격(0°=오른쪽, 시계방향)으로 잰 반지름 (원본 배율)
const RED_PROFILE = [
  136.50, 136.50, 136.25, 136.35, 136.50, 136.35, 136.60, 136.50, 136.50, 136.50, 136.60, 136.70,
  136.80, 137.00, 136.90, 137.20, 137.15, 137.15, 137.55, 137.65, 137.45, 137.65, 137.85, 138.15,
  138.10, 138.45, 138.50, 138.60, 138.75, 138.90, 139.15, 139.40, 139.35, 139.70, 139.80, 140.20,
  140.30, 140.40, 140.65, 140.65, 140.80, 141.10, 141.25, 141.50, 141.55, 141.65, 142.05, 142.00,
  142.40, 142.50, 142.85, 142.75, 143.20, 143.20, 143.20, 143.45, 143.35, 143.70, 143.65, 143.70,
  143.75, 143.85, 144.05, 144.20, 144.10, 144.00, 144.30, 144.30, 144.35, 144.45, 144.20, 144.35,
  144.25, 144.20, 144.45, 144.40, 144.45, 144.20, 144.30, 144.15, 144.35, 144.30, 144.25, 144.25,
  143.95, 144.05, 143.85, 144.05, 143.90, 143.85, 143.85, 143.85, 143.60, 143.35, 143.50, 143.40,
  143.30, 143.25, 142.90, 142.95, 142.65, 142.80, 142.60, 142.50, 142.40, 142.00, 142.00, 141.95,
  141.80, 141.55, 141.35, 141.20, 141.10, 141.05, 140.65, 140.70, 140.40, 140.50, 140.25, 140.05,
  139.90, 139.80, 139.75, 139.70, 139.70, 139.40, 139.20, 139.20, 138.95, 139.05, 139.05, 138.90,
  138.85, 138.80, 138.80, 138.85, 138.45, 138.55, 138.40, 138.45, 138.20, 138.35, 138.35, 138.35,
  138.25, 138.15, 138.10, 138.10, 138.15, 138.25, 138.35, 138.55, 138.35, 138.40, 138.50, 138.50,
  138.45, 138.65, 138.60, 138.70, 138.90, 138.75, 138.95, 138.90, 139.25, 139.25, 139.30, 139.40,
  139.55, 139.75, 139.60, 139.90, 139.85, 140.20, 140.25, 140.35, 140.50, 140.35, 140.60, 140.85,
  140.85, 140.85, 141.25, 141.35, 141.50, 141.35, 141.60, 141.55, 141.90, 141.90, 142.00, 142.10,
  142.30, 142.50, 142.40, 142.70, 142.70, 142.75, 142.80, 142.95, 143.15, 143.25, 143.25, 143.30,
  143.60, 143.60, 143.70, 143.85, 144.05, 143.85, 144.00, 144.10, 144.05, 144.10, 144.25, 144.25,
  144.40, 144.55, 144.55, 144.60, 144.70, 144.65, 144.65, 144.70, 144.80, 144.95, 145.05, 144.95,
  144.90, 145.05, 144.95, 144.95, 145.10, 145.25, 145.45, 145.25, 145.15, 145.35, 145.45, 145.45,
  145.50, 145.60, 145.35, 145.55, 145.60, 145.65, 145.60, 145.55, 145.60, 145.70, 145.80, 145.90,
  145.80, 145.70, 146.00, 145.95, 146.00, 146.10, 145.85, 146.00, 146.20, 146.15, 146.10, 146.10,
  146.15, 146.20, 146.35, 146.20, 146.10, 146.35, 146.35, 146.35, 146.10, 146.20, 146.00, 146.20,
  146.15, 146.10, 146.10, 146.15, 145.90, 145.85, 145.85, 145.75, 145.65, 145.65, 145.65, 145.35,
  145.45, 145.25, 145.45, 145.30, 145.25, 145.20, 144.85, 144.90, 144.85, 144.80, 144.60, 144.45,
  144.35, 144.25, 144.25, 144.15, 143.95, 143.65, 143.75, 143.60, 143.20, 143.25, 142.85, 142.65,
  142.65, 142.45, 142.25, 142.15, 142.05, 141.50, 141.50, 141.25, 141.05, 140.90, 140.65, 140.45,
  140.30, 140.20, 140.10, 139.70, 139.65, 139.40, 139.15, 138.90, 138.75, 138.75, 138.50, 138.45,
  138.45, 138.15, 137.90, 138.00, 137.80, 137.65, 137.55, 137.50, 137.15, 137.20, 137.25, 137.00,
  136.80, 137.00, 136.90, 136.85, 136.85, 136.50, 136.60, 136.70, 136.50, 136.35, 136.60, 136.50
];

const WHITE_PROFILE = [
  134.15, 134.20, 134.25, 134.35, 134.15, 134.35, 134.25, 134.15, 134.15, 134.15, 133.85, 133.95,
  133.75, 133.60, 133.65, 133.70, 133.35, 133.35, 133.35, 133.10, 132.85, 133.00, 132.60, 132.70,
  132.25, 132.20, 132.20, 131.90, 131.95, 131.70, 131.45, 131.40, 131.10, 130.95, 130.90, 130.75,
  130.45, 130.15, 130.10, 129.75, 129.65, 129.55, 129.40, 129.20, 129.05, 128.95, 128.80, 128.55,
  128.30, 128.30, 127.95, 127.90, 127.75, 127.70, 127.30, 127.35, 127.25, 127.20, 126.95, 127.15,
  127.00, 126.85, 126.75, 126.65, 126.60, 126.50, 126.60, 126.40, 126.55, 126.40, 126.30, 126.20,
  126.20, 126.20, 126.25, 126.30, 126.10, 126.25, 126.10, 126.30, 126.25, 126.20, 126.25, 126.30,
  126.35, 126.50, 126.65, 126.50, 126.75, 126.70, 126.65, 127.00, 127.10, 127.20, 127.30, 127.15,
  127.35, 127.60, 127.60, 127.55, 127.95, 128.00, 128.15, 128.30, 128.50, 128.40, 128.65, 128.60,
  129.00, 129.05, 129.10, 129.25, 129.45, 129.65, 129.90, 129.85, 130.20, 130.20, 130.25, 130.35,
  130.50, 130.65, 130.90, 130.75, 131.10, 131.05, 131.30, 131.50, 131.55, 131.65, 131.85, 131.85,
  131.85, 131.70, 132.05, 132.00, 132.30, 131.95, 132.10, 132.30, 132.25, 132.30, 132.20, 132.40,
  132.45, 132.45, 132.35, 132.20, 132.25, 132.05, 132.20, 132.05, 132.05, 132.15, 131.85, 131.85,
  131.90, 131.65, 131.75, 131.55, 131.55, 131.70, 131.60, 131.25, 131.25, 131.30, 131.05, 131.20,
  131.05, 130.90, 130.80, 130.80, 130.45, 130.50, 130.20, 130.00, 130.15, 130.00, 129.90, 129.50,
  129.50, 129.50, 129.25, 129.35, 129.15, 129.00, 128.90, 128.80, 128.75, 128.75, 128.45, 128.55,
  128.30, 128.10, 128.15, 128.20, 128.15, 127.75, 127.75, 127.80, 127.55, 127.45, 127.45, 127.30,
  127.15, 127.10, 127.05, 127.00, 127.05, 126.75, 126.65, 126.60, 126.45, 126.60, 126.45, 126.35,
  126.30, 126.25, 126.15, 126.05, 126.00, 126.00, 125.80, 125.60, 125.70, 125.65, 125.60, 125.35,
  125.30, 125.45, 125.30, 125.25, 125.20, 125.20, 125.05, 125.25, 125.05, 125.15, 125.00, 124.85,
  125.00, 124.80, 124.95, 124.95, 125.00, 124.70, 124.80, 124.55, 124.75, 124.60, 124.50, 124.80,
  124.80, 124.80, 124.50, 124.60, 124.70, 124.55, 124.75, 124.65, 124.55, 124.55, 124.55, 124.60,
  124.70, 124.50, 124.65, 124.50, 124.75, 124.70, 124.65, 124.70, 124.75, 124.85, 124.65, 124.80,
  124.70, 124.95, 124.90, 124.85, 124.90, 124.95, 125.05, 124.85, 125.05, 125.25, 125.20, 125.15,
  125.15, 125.40, 125.25, 125.35, 125.45, 125.65, 125.80, 125.80, 125.85, 126.10, 126.10, 126.15,
  126.35, 126.55, 126.55, 126.80, 126.65, 126.95, 127.30, 127.30, 127.50, 127.40, 127.85, 127.80,
  128.30, 128.30, 128.35, 128.70, 128.60, 129.05, 129.05, 129.20, 129.45, 129.75, 129.95, 130.00,
  130.40, 130.40, 130.55, 130.95, 130.85, 131.25, 131.35, 131.35, 131.55, 131.90, 131.85, 132.20,
  132.25, 132.35, 132.60, 132.65, 132.85, 133.10, 133.00, 133.35, 133.35, 133.40, 133.65, 133.60,
  133.75, 133.95, 133.85, 134.15, 134.15, 134.15, 134.25, 134.35, 134.15, 134.35, 134.25, 134.20
];

// ===== 시선 추적 설정 =====
// 카메라 속 얼굴 위치 → 화면 위 좌표로 옮길 때의 배율 (1 = 카메라 프레임 = 화면 전체)
const GAIN_X = 1.6;
const GAIN_Y = 1.6;
const CAM_OFFSET_Y = 0;    // 카메라가 화면 위에 있어서 생기는 세로 치우침 보정 (px)
const VIEW_DIST = 900;     // 기본 시청 거리 (px 단위, 클수록 눈동자가 덜 움직임)
const REF_IOD = 0.1;       // 기본 거리일 때 카메라 속 두 눈 사이 거리 (정규화)
const SMOOTH = 0.18;       // 따라가는 부드러움 (0~1, 클수록 빠름)

// ===== 깜빡임 =====
const BLINK_LOW = 0.3;        // 이 점수 이하 = 완전히 뜬 눈
const BLINK_HIGH = 0.6;       // 이 점수 이상 = 완전히 감은 눈
const LID_CLOSE_SPEED = 0.6;  // 감는 속도 (0~1)
const LID_OPEN_SPEED = 0.3;   // 뜨는 속도 (0~1)
// 눈꺼풀 모양 (눈 중심 기준, 원본 배율)
const LID_MEET_Y = 20;
const LID_MEET_SAG = 8;
const UPPER_LIFT_SIDE = 70;
const UPPER_LIFT_ARCH = 110;
const LOWER_DROP_SIDE = 70;
const LOWER_DROP_ARCH = 80;
let lidClose = 0;             // 0 = 뜸, 1 = 감음
let manualBlinkUntil = 0;

// ===== 3D 눈알 =====
const GAZE_GAIN = 1.0;     // 시선 각도 배율
const MAX_ANGLE = 55;      // 최대 회전 각도 (도)
let SPHERE_R;

// ===== 조명 =====
const CORNEA_RATIO = 0.75;
const WRAP = 0.35;
const SHADE_STRENGTH = 0.72;
const SHADE_GAMMA = 1.6;
const SHADE_COLOR = [40, 10, 70];
const RIM_LIGHT = 0.18;

let LIGHT;
let HALF;
let CORNEA_R, CORNEA_Z;
let CORNEA_CAP;
const GLINT_BLEND = (6 * Math.PI) / 180;
let shadeImg;

const eyes = [];
const target = { x: W / 2, y: H / 2, d: VIEW_DIST };
let showDebug = false;

// 창 크기 → 1920×1080 그래픽을 비율 유지해 가운데 맞춤하는 배율과 여백
const view = { s: 1, ox: 0, oy: 0 };

function fitView() {
  view.s = Math.min(width / W, height / H);
  view.ox = (width - W * view.s) / 2;
  view.oy = (height - H * view.s) / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fitView();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fitView();
  pixelDensity(2);
  noStroke();

  SPHERE_R = WHITE_PROFILE.reduce((a, b) => a + b, 0) / WHITE_PROFILE.length;
  setupLighting();

  for (const [gx, gy] of HOUR_POS) {
    eyes.push({
      label: '',       // 동공에 쓸 숫자 (매 프레임 시간에 따라 정해짐)
      x: CLOCK_X + gx * TILE,
      y: CLOCK_Y + gy * TILE,
      g: [0, 0, 1],    // 시선 방향 단위벡터 (z 가 화면 밖, 관객 쪽)
    });
  }
}

function draw() {
  background(C_BG);
  updateTarget();
  updateBlink();

  push();
  translate(view.ox, view.oy);
  scale(view.s);

  const crop = showFaces ? updateFaceCrop() : null;
  if (showFaces) drawCenterFace(crop);

  fill(C_PANEL);
  drawEdgeSpikes();
  for (const e of eyes) drawTile(e);

  // 레이어 순서: 가운데 얼굴 → 가시·검은 칸 → 작은 얼굴 사각형 → 눈알(맨 위)
  const lit = timeSlots();
  if (showFaces) drawSatFaces(crop, lit);

  // 빨간 테두리를 먼저 모두 깔아둠
  fill(C_RED);
  for (const e of eyes) {
    push();
    translate(e.x, e.y);
    scale(EYE_SCALE);
    drawProfile(0, 0, RED_PROFILE);
    pop();
  }

  eyes.forEach((e, i) => {
    e.label = lit.get(i) || ''; // 시간 칸이 아니면 숫자 없음
    updateGaze(e);
    push();
    translate(e.x, e.y);
    scale(EYE_SCALE);
    drawEye(e);
    if (lidClose > 0.001) drawLids(lidClose);
    if (lit.has(i)) tintEye();
    pop();
  });

  if (showDebug) drawDebug();
  pop();
  drawCamPreview();
}

// ===== 검은 사각형 + 가시 =====
function drawTile(e) {
  const h = TILE / 2;
  rect(e.x - h, e.y - h, TILE + 0.5, TILE + 0.5); // +0.5: 맞닿는 칸 사이 틈 방지

  const x0 = e.x - h + SPIKE_INSET;
  const step = (TILE - 2 * SPIKE_INSET) / (SPIKE_COUNT - 1);
  const w = SPIKE_BASE / 2;
  for (let i = 0; i < SPIKE_COUNT; i++) {
    const x = x0 + i * step;
    // 모든 칸에 위·아래 가시 (안쪽 칸 사이에선 위아래 가시가 끝끼리 거의 맞닿음)
    const yt = e.y - h + 1;
    triangle(x - w, yt, x + w, yt, x, yt - SPIKE_LEN);
    const yb = e.y + h - 1;
    triangle(x - w, yb, x + w, yb, x, yb + SPIKE_LEN);
  }
}

// ===== 화면 왼쪽·오른쪽 끝의 가로 가시 =====
// 칸 크기(TILE)만큼씩 17개 묶음으로, 시계 중심 높이를 기준으로 묶음 사이에 살짝 틈이 생김
// 창이 16:9 보다 넓거나 좁아도 실제 창의 좌우 벽 끝에 붙고, 위아래도 창 끝까지 채움
function drawEdgeSpikes() {
  const left = -view.ox / view.s;
  const right = W + view.ox / view.s;
  const top = -view.oy / view.s;
  const bottom = H + view.oy / view.s;

  const step = (TILE - 2 * SPIKE_INSET) / (SPIKE_COUNT - 1);
  const w = EDGE_SPIKE_BASE / 2;
  const kMin = Math.floor((top - CLOCK_Y) / TILE) - 1;
  const kMax = Math.ceil((bottom - CLOCK_Y) / TILE);
  for (let k = kMin; k <= kMax; k++) {
    const y0 = CLOCK_Y + k * TILE + SPIKE_INSET;
    for (let i = 0; i < SPIKE_COUNT; i++) {
      const y = y0 + i * step;
      if (y < top - w || y > bottom + w) continue;
      triangle(left, y - w, left, y + w, left + EDGE_SPIKE_LEN, y);
      triangle(right, y - w, right, y + w, right - EDGE_SPIKE_LEN, y);
    }
  }
}

// ===== 얼굴 사각형 =====
// 카메라에서 얼굴 부분만 정사각형으로 잘라서
//  1) 시계 가운데 큰 정사각형 (눈 칸과 같은 크기)
//  2) 각 눈 칸 바깥쪽 모서리에 꼭짓점이 맞닿는 작은 정사각형 12개
// 에 보여줌. 작은 사각형 중 지금 시·분에 해당하는 두 칸은 파란색 (아래 '시간 표시' 참고)
const CENTER_FACE = TILE;          // 가운데 정사각형 한 변
const SAT_FACE = TILE * 0.48;      // 바깥 작은 정사각형 한 변
const FACE_ZOOM = 1.7;             // 얼굴 크기 대비 잘라낼 크기 (작을수록 얼굴이 크게)
const FACE_SMOOTH = 0.15;          // 잘라내는 영역이 얼굴을 따라가는 부드러움
let showFaces = true;              // C 키로 켜기/끄기
let faceCrop = null;               // { cx, cy, side } 카메라 픽셀 단위

// 작은 사각형 중심: 눈 칸 중심에서 바깥쪽(시계 중심 반대) 대각/수평/수직으로
// (칸 반 + 작은 사각형 반) 만큼 → 두 사각형의 모서리가 정확히 맞닿음
function satCenter(e, gx, gy) {
  const d = TILE / 2 + SAT_FACE / 2;
  return { x: e.x + Math.sign(gx) * d, y: e.y + Math.sign(gy) * d };
}

// 이번 프레임에 잘라낼 카메라 영역 계산 (영상 준비 전이면 null)
function updateFaceCrop() {
  const t = window.faceTracker;
  const v = t && t.video;
  if (!v || v.readyState < 2 || !v.videoWidth) return null;
  const VW = v.videoWidth;
  const VH = v.videoHeight;

  // 목표 영역: 얼굴이 잡히면 얼굴 둘레, 아니면 화면 가운데 정사각형
  let goal = { cx: VW / 2, cy: VH / 2, side: Math.min(VW, VH) };
  if (t.found && t.landmarks) {
    let x0 = 1, y0 = 1, x1 = 0, y1 = 0;
    for (const p of t.landmarks) {
      if (p.x < x0) x0 = p.x;
      if (p.x > x1) x1 = p.x;
      if (p.y < y0) y0 = p.y;
      if (p.y > y1) y1 = p.y;
    }
    goal = {
      cx: ((x0 + x1) / 2) * VW,
      cy: ((y0 + y1) / 2) * VH,
      side: Math.max((x1 - x0) * VW, (y1 - y0) * VH) * FACE_ZOOM,
    };
  }
  if (!faceCrop) faceCrop = { ...goal };
  for (const k of ['cx', 'cy', 'side']) faceCrop[k] = lerp(faceCrop[k], goal[k], FACE_SMOOTH);

  // 카메라 프레임 밖으로 나가지 않게 정리
  const side = Math.min(faceCrop.side, VW, VH);
  return {
    v,
    side,
    sx: constrain(faceCrop.cx - side / 2, 0, VW - side),
    sy: constrain(faceCrop.cy - side / 2, 0, VH - side),
  };
}

// (cx, cy) 중심, 한 변 size 인 정사각형에 얼굴을 거울처럼 좌우 반전해 그림
function drawFace(crop, cx, cy, size) {
  const ctx = drawingContext;
  ctx.save();
  ctx.translate(cx + size / 2, cy - size / 2);
  ctx.scale(-1, 1);
  ctx.drawImage(crop.v, crop.sx, crop.sy, crop.side, crop.side, 0, 0, size, size);
  ctx.restore();
}

function drawCenterFace(crop) {
  if (crop) drawFace(crop, CLOCK_X, CLOCK_Y, CENTER_FACE);
}

// ===== 시간 표시 =====
// 지금 '시'에 해당하는 숫자 칸과, '분'에 가장 가까운 숫자 칸(5분 단위) 의 카메라가 파란색으로 바뀜.
// 예) 4:12 → 4 와 2(10분) 칸이 파랑, 4:58 → 4 와 12 칸이 파랑. 둘이 겹치면(12:00 등) 한 칸만 파랑.
// ?time=10:08 처럼 주면 그 시각에서 시작해 흘러감 (촬영·테스트용)
let timeOffsetMs = 0;
{
  const q = new URLSearchParams(location.search).get('time');
  const m = q && q.match(/^(\d{1,2}):(\d{2})$/);
  if (m) {
    const d = new Date();
    d.setHours(+m[1], +m[2], 0, 0);
    timeOffsetMs = d.getTime() - Date.now();
  }
}

const SWAP_MS = 2000; // 시·분 칸이 겹칠 때 숫자를 번갈아 보여주는 간격

// 파랗게 바뀔 칸과 그 동공에 쓸 숫자. Map<칸 번호, 숫자 문자열> (0 = 12시 칸, 1 = 1시 칸, …)
//  - 시 칸: 시 (1~12)
//  - 분 칸: 실제 분 두 자리 (예: 4:12 → 2번 칸 동공에 "12")
//  - 둘이 같은 칸이면 시와 분을 번갈아 보여줌
function timeSlots() {
  const now = new Date(Date.now() + timeOffsetMs);
  const minutes = now.getMinutes();
  const min = minutes + now.getSeconds() / 60;
  const hourSlot = now.getHours() % 12;
  const minSlot = Math.round(min / 5) % 12;
  const hourLabel = String(hourSlot === 0 ? 12 : hourSlot);
  const minLabel = String(minutes).padStart(2, '0');

  const slots = new Map();
  if (hourSlot === minSlot) {
    const showHour = Math.floor(millis() / SWAP_MS) % 2 === 0;
    slots.set(hourSlot, showHour ? hourLabel : minLabel);
  } else {
    slots.set(hourSlot, hourLabel);
    slots.set(minSlot, minLabel);
  }
  return slots;
}

const C_EMPTY = '#E6E6E6'; // 카메라 준비 전, 시간이 아닌 칸의 빈자리 색

// 시간 칸의 눈알을 얼굴과 같은 방식('color' 합성)으로 파랗게 물들임
// → 밝기는 그대로라 흰자는 희게, 동공은 검게 남고 빨간 테두리·음영이 파란 계열로 바뀜
function tintEye() {
  const ctx = drawingContext;
  ctx.save();
  tracePath(ctx, 0, 0, RED_PROFILE);
  ctx.clip();
  ctx.globalCompositeOperation = 'color';
  fill(C_BLUE);
  rect(-160, -160, 320, 320);
  ctx.restore();
}

function drawSatFaces(crop, lit) {
  HOUR_POS.forEach(([gx, gy], i) => {
    const c = satCenter(eyes[i], gx, gy);
    const x = c.x - SAT_FACE / 2;
    const y = c.y - SAT_FACE / 2;
    if (lit.has(i)) {
      // 시간 칸: 얼굴은 보이되 원래 파란색(C_BLUE) 한 가지 색으로만
      // 1) 'saturation' 합성으로 회색 덮어 흑백으로 만들고
      // 2) 'multiply' 합성으로 파랑을 곱함 → 밝은 곳 = 정확히 C_BLUE, 어두운 곳 = 검정
      if (crop) {
        drawFace(crop, c.x, c.y, SAT_FACE);
        const ctx = drawingContext;
        ctx.save();
        ctx.globalCompositeOperation = 'saturation';
        fill(128);
        rect(x, y, SAT_FACE, SAT_FACE);
        ctx.globalCompositeOperation = 'multiply';
        fill(C_BLUE);
        rect(x, y, SAT_FACE, SAT_FACE);
        ctx.restore();
      } else {
        fill(C_BLUE);
        rect(x, y, SAT_FACE, SAT_FACE);
      }
    } else if (crop) {
      drawFace(crop, c.x, c.y, SAT_FACE);
    } else {
      fill(C_EMPTY);
      rect(x, y, SAT_FACE, SAT_FACE);
    }
  });
}

// ===== 오른쪽 위 카메라 미리보기 =====
const EYE_CONTOURS = [
  [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246],
  [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398],
];
const IRIS_RINGS = [
  [469, 470, 471, 472],
  [474, 475, 476, 477],
];

function drawCamPreview() {
  const box = document.getElementById('cam-preview');
  if (!box || box.classList.contains('hidden')) return;
  const cv = document.getElementById('cam-canvas');
  const cap = document.getElementById('cam-caption');
  const c = cv.getContext('2d');
  const t = window.faceTracker;
  const w = cv.width;
  const h = cv.height;

  c.fillStyle = '#111';
  c.fillRect(0, 0, w, h);

  if (!t || t.status === 'loading') {
    cap.textContent = '카메라 준비 중…';
    return;
  }
  if (t.status === 'error') {
    cap.textContent = '카메라 오류: ' + t.error;
    return;
  }

  if (t.video && t.video.readyState >= 2) {
    c.save();
    c.translate(w, 0);
    c.scale(-1, 1);
    c.drawImage(t.video, 0, 0, w, h);
    c.restore();
  }

  if (!t.found) {
    cap.textContent = '얼굴을 찾는 중…';
    return;
  }

  const lm = t.landmarks;
  const px = (p) => (1 - p.x) * w;
  const py = (p) => p.y * h;

  if (lm) {
    c.strokeStyle = 'rgba(0, 169, 220, 0.9)';
    c.lineWidth = 2;
    for (const ring of EYE_CONTOURS) {
      c.beginPath();
      ring.forEach((i, k) => (k ? c.lineTo(px(lm[i]), py(lm[i])) : c.moveTo(px(lm[i]), py(lm[i]))));
      c.closePath();
      c.stroke();
    }
    c.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    for (const ring of IRIS_RINGS) {
      const ctr = lm[ring[0] - 1];
      const r = Math.hypot(px(lm[ring[0]]) - px(ctr), py(lm[ring[0]]) - py(ctr));
      c.beginPath();
      c.arc(px(ctr), py(ctr), r, 0, Math.PI * 2);
      c.stroke();
    }
  }

  c.fillStyle = C_RED;
  c.beginPath();
  c.arc((1 - t.x) * w, t.y * h, 8, 0, Math.PI * 2);
  c.fill();

  const openPct = Math.round((1 - t.blink) * 100);
  const thresholdPct = Math.round((1 - (BLINK_LOW + BLINK_HIGH) / 2) * 100);
  const state = lidClose > 0.5 ? '감음' : '뜸';
  cap.textContent = `뜬 정도 ${openPct}% (기준 ${thresholdPct}% 아래면 감음) · ${state}`;
}

// ===== 깜빡임 =====
function updateBlink() {
  const t = window.faceTracker;
  let goal = 0;
  if (t && t.found) {
    const k = constrain((t.blink - BLINK_LOW) / (BLINK_HIGH - BLINK_LOW), 0, 1);
    goal = k * k * (3 - 2 * k);
  }
  if (manualBlinkUntil > millis()) goal = 1; // 키보드 B: 카메라 없이 테스트

  lidClose = lerp(lidClose, goal, goal > lidClose ? LID_CLOSE_SPEED : LID_OPEN_SPEED);
}

// 눈꺼풀 (눈 중심 = 원점, 원본 배율 좌표)
function drawLids(close) {
  const open = 1 - close;
  const ctx = drawingContext;
  ctx.save();
  tracePath(ctx, 0, 0, RED_PROFILE);
  ctx.clip();

  fill(C_RED);
  const span = 160;
  const N = 48;
  const meet = (u) => LID_MEET_Y + LID_MEET_SAG * (1 - u * u);

  beginShape();
  vertex(-span, -span);
  for (let i = 0; i <= N; i++) {
    const u = (i / N) * 2 - 1;
    const lift = open * (UPPER_LIFT_SIDE + UPPER_LIFT_ARCH * (1 - u * u));
    vertex(u * span, meet(u) - lift);
  }
  vertex(span, -span);
  endShape(CLOSE);

  beginShape();
  vertex(-span, span);
  for (let i = 0; i <= N; i++) {
    const u = (i / N) * 2 - 1;
    const drop = open * (LOWER_DROP_SIDE + LOWER_DROP_ARCH * (1 - u * u));
    vertex(u * span, meet(u) + drop);
  }
  vertex(span, span);
  endShape(CLOSE);

  ctx.restore();
}

function tracePath(ctx, cx, cy, radii) {
  const n = radii.length;
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TWO_PI;
    const px = cx + radii[i] * Math.cos(a);
    const py = cy + radii[i] * Math.sin(a);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

// 사용자의 눈 위치(카메라) → 화면 앞 3D 공간의 한 점
function updateTarget() {
  const t = window.faceTracker;
  let tx = W / 2;
  let ty = H / 2;
  let td = VIEW_DIST;

  if (t && t.found) {
    tx = W / 2 + (0.5 - t.x) * W * GAIN_X; // 셀피 카메라라 좌우 반전
    ty = H / 2 + (t.y - 0.5) * H * GAIN_Y + CAM_OFFSET_Y;
    td = VIEW_DIST * (REF_IOD / max(t.iod, 0.02));
  }

  target.x = lerp(target.x, tx, SMOOTH);
  target.y = lerp(target.y, ty, SMOOTH);
  target.d = lerp(target.d, td, SMOOTH);
}

// 각 눈이 화면 앞 target 을 바라보는 3D 시선 방향 (화면 좌표 기준)
function updateGaze(e) {
  const dx = target.x - e.x;
  const dy = target.y - e.y;
  const planar = Math.hypot(dx, dy);

  let theta = Math.atan2(planar, target.d) * GAZE_GAIN;
  theta = Math.min(theta, radians(MAX_ANGLE));

  const ux = planar > 1e-6 ? dx / planar : 0;
  const uy = planar > 1e-6 ? dy / planar : 0;
  const goal = [Math.sin(theta) * ux, Math.sin(theta) * uy, Math.cos(theta)];

  const g = e.g;
  for (let i = 0; i < 3; i++) g[i] = lerp(g[i], goal[i], SMOOTH);
  const n = Math.hypot(g[0], g[1], g[2]);
  for (let i = 0; i < 3; i++) g[i] /= n;
}

// 눈 하나 그리기 (눈 중심 = 원점, 원본 배율 좌표)
function drawEye(e) {
  fill(C_WHITE);
  drawProfile(0, 0, WHITE_PROFILE);

  const ctx = drawingContext;
  ctx.save();
  tracePath(ctx, 0, 0, WHITE_PROFILE);
  ctx.clip();

  const [a, b, c] = e.g;
  const k = 1 / (1 + c);
  const u = [1 - a * a * k, -a * b * k];
  const v = [-a * b * k, 1 - b * b * k];

  const R = SPHERE_R;
  const disc = (r, col) => {
    const h = Math.sqrt(Math.max(R * R - r * r, 0));
    push();
    applyMatrix(u[0], u[1], v[0], v[1], a * h, b * h);
    fill(col);
    circle(0, 0, r * 2);
    pop();
  };

  disc(IRIS_R, C_BLUE);
  disc(PUPIL_R, C_PUPIL);

  // 동공 위 숫자 (시간 칸만): 동공과 같은 구 표면 위에 붙여서 눈알과 함께 돌아가게 함
  const h = Math.sqrt(R * R - PUPIL_R * PUPIL_R);
  if (e.label) {
  push();
  applyMatrix(u[0], u[1], v[0], v[1], a * h, b * h);
  fill(C_NUM);
  textFont(NUM_FONT);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(e.label.length > 1 ? NUM_SIZE_2 : NUM_SIZE_1);
  text(e.label, 0, NUM_OFFSET_Y);
  pop();
  }

  image(shadeImg, -shadeImg.width / 2, -shadeImg.height / 2);

  // 반사광: 각막 위면 각막 반사, 벗어나면 흰자 반사. 경계에선 부드럽게 섞음
  const cosHG = HALF[0] * a + HALF[1] * b + HALF[2] * c;
  const angOff = Math.acos(Math.min(1, cosHG));
  const t = constrain((angOff - (CORNEA_CAP - GLINT_BLEND)) / (2 * GLINT_BLEND), 0, 1);
  const s = t * t * (3 - 2 * t);
  const corneaX = a * CORNEA_Z + CORNEA_R * HALF[0];
  const corneaY = b * CORNEA_Z + CORNEA_R * HALF[1];
  const scleraX = R * HALF[0];
  const scleraY = R * HALF[1];
  const hr = HL_R * lerp(1, R / CORNEA_R, s);
  fill(C_WHITE);
  circle(lerp(corneaX, scleraX, s), lerp(corneaY, scleraY, s), hr * 2);

  ctx.restore();
}

function setupLighting() {
  const R = SPHERE_R;

  CORNEA_R = R * CORNEA_RATIO;
  const irisDepth = Math.sqrt(R * R - IRIS_R * IRIS_R);
  CORNEA_Z = irisDepth - Math.sqrt(CORNEA_R * CORNEA_R - IRIS_R * IRIS_R);
  CORNEA_CAP = Math.asin(IRIS_R / CORNEA_R);

  // 정면일 때 반사점이 (HL_X, HL_Y) 에 오도록 광원 방향 역산
  const hxN = HL_X / CORNEA_R;
  const hyN = HL_Y / CORNEA_R;
  HALF = [hxN, hyN, Math.sqrt(Math.max(1 - hxN * hxN - hyN * hyN, 0))];
  LIGHT = [2 * HALF[2] * HALF[0], 2 * HALF[2] * HALF[1], 2 * HALF[2] * HALF[2] - 1];

  const size = Math.ceil(Math.max(...WHITE_PROFILE)) * 2 + 4;
  const d = 2;
  shadeImg = createGraphics(size, size);
  shadeImg.pixelDensity(d);
  shadeImg.loadPixels();
  const P = size * d;
  const c = size / 2;
  for (let py = 0; py < P; py++) {
    for (let px = 0; px < P; px++) {
      let nx = ((px + 0.5) / d - c) / R;
      let ny = ((py + 0.5) / d - c) / R;
      let r2 = nx * nx + ny * ny;
      if (r2 > 1) {
        const s = 1 / Math.sqrt(r2);
        nx *= s;
        ny *= s;
        r2 = 1;
      }
      const nz = Math.sqrt(1 - r2);

      const ndl = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2];
      const lit = Math.max(0, Math.min(1, (ndl + WRAP) / (1 + WRAP)));
      let dark = Math.pow(1 - lit, SHADE_GAMMA) * SHADE_STRENGTH;

      const rim = Math.pow(1 - nz, 3) * Math.max(0, -ndl);
      dark *= 1 - RIM_LIGHT * rim * 3;

      const i = (py * P + px) * 4;
      shadeImg.pixels[i] = SHADE_COLOR[0];
      shadeImg.pixels[i + 1] = SHADE_COLOR[1];
      shadeImg.pixels[i + 2] = SHADE_COLOR[2];
      shadeImg.pixels[i + 3] = Math.max(0, dark) * 255;
    }
  }
  shadeImg.updatePixels();
}

// D: 추적 디버그 · V: 카메라 미리보기 · B: 깜빡임 테스트
function keyPressed() {
  if (key === 'd' || key === 'D') showDebug = !showDebug;
  if (key === 'v' || key === 'V') document.getElementById('cam-preview').classList.toggle('hidden');
  if (key === 'b' || key === 'B') manualBlinkUntil = millis() + 150;
  if (key === 'c' || key === 'C') showFaces = !showFaces;
}

function drawDebug() {
  const t = window.faceTracker;
  push();
  fill(0, 255, 0);
  circle(target.x, target.y, 14);
  fill(0, 160, 0);
  textSize(16);
  const status = !t ? 'tracker 없음' : t.status === 'error' ? 'error: ' + t.error : t.status;
  text(`tracker: ${status}  face: ${t && t.found ? 'O' : 'X'}`, 20, 30);
  text(`blink score: ${t ? t.blink.toFixed(2) : '-'}  lid: ${lidClose.toFixed(2)}`, 20, 52);
  pop();
}

// 반지름 배열(1° 간격)로 닫힌 도형 그리기
function drawProfile(cx, cy, radii) {
  const n = radii.length;
  beginShape();
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TWO_PI;
    vertex(cx + radii[i] * cos(a), cy + radii[i] * sin(a));
  }
  endShape(CLOSE);
}
