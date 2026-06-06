const orb = document.querySelector("#orb");
const phase = document.querySelector("#phase");
const count = document.querySelector("#count");
const rounds = document.querySelector("#rounds");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const presets = document.querySelectorAll(".preset");

let inhale = 4;
let exhale = 6;
let running = false;
let timer = null;
let secondsLeft = inhale;
let isInhale = true;
let completedCycles = 0;

function render() {
  phase.textContent = running ? (isInhale ? "Inhale" : "Exhale") : "Ready";
  count.textContent = running ? `${secondsLeft}s` : `${inhale} / ${exhale}`;
  rounds.textContent = `${completedCycles} ${completedCycles === 1 ? "cycle" : "cycles"}`;
  orb.style.setProperty("--cycle", `${inhale + exhale}s`);
  orb.classList.toggle("active", running);
  start.textContent = running ? "Pause" : "Start";
}

function tick() {
  secondsLeft -= 1;
  if (secondsLeft <= 0) {
    if (!isInhale) completedCycles += 1;
    isInhale = !isInhale;
    secondsLeft = isInhale ? inhale : exhale;
  }
  render();
}

start.addEventListener("click", () => {
  running = !running;
  clearInterval(timer);
  if (running) {
    secondsLeft = secondsLeft || inhale;
    timer = setInterval(tick, 1000);
  }
  render();
});

reset.addEventListener("click", () => {
  running = false;
  clearInterval(timer);
  isInhale = true;
  secondsLeft = inhale;
  completedCycles = 0;
  render();
});

presets.forEach((preset) => {
  preset.addEventListener("click", () => {
    inhale = Number(preset.dataset.inhale);
    exhale = Number(preset.dataset.exhale);
    running = false;
    clearInterval(timer);
    isInhale = true;
    secondsLeft = inhale;
    completedCycles = 0;
    presets.forEach((item) => item.setAttribute("aria-pressed", String(item === preset)));
    render();
  });
});

render();
