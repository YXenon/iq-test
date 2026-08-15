const whiteBtn = document.getElementById("objectj");
const parentElement = document.getElementById("box");
const audioControl = document.getElementById("bgaudio");
const instructionPanel = document.getElementById("instruction");
const body = document.body;

let btnX;
let btnY;
let clientX;
let clientY;
const HIT_RADIUS = 300;

const generateRandomNo = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const setBtnPos = (x, y) => {
  whiteBtn.style.left = `${x}px`;
  whiteBtn.style.top = `${y}px`;
};

const setClientPos = (x, y) => {
  const rect = parentElement.getBoundingClientRect();
  clientX = Math.floor(Math.min(Math.max(x, rect.left), rect.right));
  clientY = Math.floor(Math.min(Math.max(y, rect.top), rect.bottom));
};

const tooClose = () => {
  return (Math.abs(btnX - clientX) < HIT_RADIUS) && (Math.abs(btnY - clientY) < HIT_RADIUS);
}

const moveButton = () => {
    const w = whiteBtn.offsetWidth;
    const h = whiteBtn.offsetHeight;
    const rect = parentElement.getBoundingClientRect();
    btnX = generateRandomNo(rect.left+w, rect.right-w);
    btnY = generateRandomNo(rect.top+h, rect.bottom-h);

    if (tooClose()) {
      moveButton();
      return;
    }

    setBtnPos(btnX, btnY);
};

window.addEventListener("mousemove", (e) => {
  setClientPos(e.clientX, e.clientY);
  if (tooClose()) {
    moveButton()
  }
});

const epilepsy = () => {
  const colors = ["red", "blue", "lime", "yellow", "orange", "green"];
  body.style.background = colors[generateRandomNo(0, colors.length)];
  whiteBtn.style.background = colors[generateRandomNo(0, colors.length)];
}

const epilepsyInterval = setInterval(()=>{
  epilepsy();
}, 10);

const moveBtnInterval = setInterval(()=>{
  moveButton()
}, 500)

whiteBtn.addEventListener("click", () => {
  whiteBtn.style.background = "#33FF06";
  whiteBtn.style.boxShadow = "0 0 50px 0 #33FF06";
  setBtnPos(btnX, btnY);
  clearInterval(epilepsyInterval);
  clearInterval(moveBtnInterval);
  audioControl.pause()
});

function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) { // Safari
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE11
    element.msRequestFullscreen();
  }
}

document.addEventListener('click', ()=>{
  instructionPanel.style.display = "none";
  parentElement.style.display = 'block';
  openFullscreen(document.documentElement);
  moveButton();
  audioControl.play();
  document.title = "Fuck You"
}, {once: true})