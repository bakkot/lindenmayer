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
  // set up canvas
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width - 4;
  let h = canvas.height - 4;
  const origW = w;
  const origH = h;
  const origBorder = canvas.style.border;
  ctx.translate(2, 2);

  function clear() {
    ctx.clearRect(-2, -2, w + 4, h + 4);
  };

  let current, step;

  canvas.addEventListener('click', () => {
    if (step) step(w, h);
  });

  const setPickerAngle = initAngleSelector(throttle(angle => {
    clear();
    current.delta = angle;
    current.render(ctx, w, h, step.current());
  }, 100));


  // set up selector
  const select = document.querySelector('select');
  for (let name of Object.keys(systems)) {
    const option = document.createElement('option');
    option.innerText = name;
    select.appendChild(option);
  }

  function selectChange() {
    clear();
    current = systems[select.value];
    current = new TurtleSystem( // ugh
      current.axiom,
      current.production,
      current.delta,
      current.alpha
    );
    current.origDelta = current.delta;
    step = current.getStepper(ctx, clear);
    setPickerAngle(current.delta);
    current.render(ctx, w, h, step.current());
  }

  select.addEventListener('change', selectChange);
  selectChange();


  // set up animate button / event
  const animate = document.getElementById('animate');
  let interval = 0;
  const playPause = () => {
    if (!interval) {
      interval = setInterval(() => {
        clear();
        current.delta -= Math.PI / 400;
        setPickerAngle(current.delta);
        current.render(ctx, w, h, step.current());
      }, 50);
      animate.value = '\u{2590}\u{2590} animate';
    } else {
      clearInterval(interval);
      interval = 0;
      animate.value = '\u{25b6} animate';
    }
  };
  animate.addEventListener('click', playPause);

  // set up reset button
  const reset = () => {
    clear();
    if (interval) {
      clearInterval(interval);
      interval = 0;
      animate.value = '\u{25b6} animate';
    }
    if (current.origDelta !== void 0) current.delta = current.origDelta;
    step = current.getStepper(ctx, clear);
    setPickerAngle(current.delta);
    current.render(ctx, w, h, step.current());
  };
  document.getElementById('reset').addEventListener('click', reset);

  // set up fullscreening
  const reqFullscreen = canvas.webkitRequestFullScreen
    ? canvas.webkitRequestFullScreen.bind(canvas)
    :  canvas.mozRequestFullScreen
      ? canvas.mozRequestFullScreen.bind(canvas)
      : null;
  let fullscreen;
  if (reqFullscreen) {
    fullscreen = () => {
      reqFullscreen();
      canvas.style.border = '';
      w = canvas.width = screen.width;
      h = canvas.height = screen.height;
      current.render(ctx, w, h, step.current());
    };
    const ele = document.getElementById('fullscreen');
    ele.style.display = '';

    ele.addEventListener('click', fullscreen);

    const exitFullScreen = () => {
      if (!document.webkitIsFullScreen && !document.mozFullScreen) {
        canvas.style.border = origBorder;
        w = canvas.width = origW;
        h = canvas.height = origH;
        current.render(ctx, w, h, step.current());
      }
    };
    document.addEventListener('webkitfullscreenchange', exitFullScreen);
    document.addEventListener('mozfullscreenchange', exitFullScreen);
  }

  // set up keyboard
  document.body.addEventListener('keypress', e => {
    if (e.key == ' ') playPause();
    else if (e.key == 'r') reset();
    else if (fullscreen && e.key == 'f') fullscreen();
  });
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
