// ugh, not this
let current = penrose;
current = new TurtleSystem(current.axiom, current.production, current.delta, current.alpha);


function initAngleSelector(callback) {
  const circle = document.querySelector('.angle-circle');
  const box = document.querySelector('.angle-pointer-box');
  let dragging = false;

  function consumeAngleEvent(e) {
    const circlePos = circle.getBoundingClientRect();
    const angle = Math.atan2((circlePos.top + circlePos.height / 2) - e.clientY , e.clientX - (circlePos.left + circlePos.width / 2));

    setAngle(angle);

    callback(angle);
  }

  function setAngle(angle) {
    box.style.transform = 'rotate(' + (Math.PI - angle) + 'rad)';
  }

  circle.addEventListener('mousedown', e => {
    dragging = true;
    consumeAngleEvent(e);
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    consumeAngleEvent(e);
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
  });

  return setAngle;
}

addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const scale = canvas.width - 4;
  ctx.translate(2, 2);

  function clear() {
    ctx.clearRect(-2, -2, scale + 4, scale + 4);
  };

  const step = current.getStepper(ctx, scale, clear);

  canvas.addEventListener('click', step);

  const setPickerAngle = initAngleSelector(throttle(angle => {
    clear();
    console.log(current.delta);
    current.delta = angle;
    current.render(ctx, scale, step.current());
  }, 100));

  setPickerAngle(current.delta);
});



function throttle(func, delay) {
  let previous = 0;
  let timeout = 0;
  let deferredArgs = [];
  const deferred = () => {
    previous = Date.now();
    timeout = 0;
    func(...deferredArgs);
    deferredArgs = [];
  };
  return (...args) => {
    deferredArgs = args;
    const remaining = delay - (Date.now() - previous);
    if (remaining <= 0 || remaining > delay) {
      if (timeout) {
        clearTimeout(timeout);
      }
      deferred();
    } else if (!timeout) {
      timeout = setTimeout(deferred, remaining);
    }
  };
};
