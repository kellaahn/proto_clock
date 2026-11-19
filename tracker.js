// MediaPipe Face Landmarker로 웹캠 속 사용자의 눈 위치를 추적해서
// window.faceTracker 에 정규화 좌표(0~1, 카메라 프레임 기준)로 올려둔다.
import {
  FaceLandmarker,
  FilesetResolver,
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs';

const WASM_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

// 홍채 중심 랜드마크 (refined landmarks 478개 중)
const IRIS_A = 468;
const IRIS_B = 473;

const tracker = {
  status: 'loading', // loading | ready | error
  error: null,
  found: false,
  x: 0.5,   // 두 눈 중간점 (카메라 이미지 기준, 미러링 전)
  y: 0.5,
  iod: 0.1, // 두 눈 사이 거리 (정규화) → 얼마나 가까이 있는지
  blink: 0, // 눈 감김 정도 0(뜸) ~ 1(감음), 두 눈 중 더 감긴 쪽
  landmarks: null, // 최근 프레임의 얼굴 랜드마크 (미리보기 표시용)
  video: null,
};
window.faceTracker = tracker;

async function start() {
  try {
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;
    tracker.video = video;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' },
      audio: false,
    });
    video.srcObject = stream;
    await video.play();

    const fileset = await FilesetResolver.forVisionTasks(WASM_URL);
    const landmarker = await FaceLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
      runningMode: 'VIDEO',
      numFaces: 1,
      outputFaceBlendshapes: true, // eyeBlinkLeft / eyeBlinkRight 점수
    });

    tracker.status = 'ready';
    let lastTime = -1;

    const loop = () => {
      if (video.readyState >= 2 && video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        const res = landmarker.detectForVideo(video, performance.now());
        const lm = res.faceLandmarks && res.faceLandmarks[0];
        if (lm && lm.length > IRIS_B) {
          const a = lm[IRIS_A];
          const b = lm[IRIS_B];
          tracker.x = (a.x + b.x) / 2;
          tracker.y = (a.y + b.y) / 2;
          tracker.iod = Math.hypot(a.x - b.x, a.y - b.y);
          tracker.found = true;
          tracker.landmarks = lm;

          const shapes = res.faceBlendshapes && res.faceBlendshapes[0];
          if (shapes) {
            let l = 0;
            let r = 0;
            for (const cat of shapes.categories) {
              if (cat.categoryName === 'eyeBlinkLeft') l = cat.score;
              else if (cat.categoryName === 'eyeBlinkRight') r = cat.score;
            }
            tracker.blink = Math.max(l, r);
          }
        } else {
          tracker.found = false;
          tracker.blink = 0;
        }
      }
      requestAnimationFrame(loop);
    };
    loop();
  } catch (err) {
    console.error(err);
    tracker.status = 'error';
    tracker.error = err.message || String(err);
  }
}

start();
