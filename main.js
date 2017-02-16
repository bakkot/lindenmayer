"use strict";

const quadKoch = new TurtleSystem(
  'F-F-F-F',
  {
    F: 'F-F+F+FF-F-F+F'
  },
  Math.PI / 2
);

const quadFlake = new TurtleSystem(
  '-F',
  {
    F: 'F+F-F-F+F'
  },
 Math.PI / 2,
 Math.PI / 2
);

const islandLake = new TurtleSystem(
  'F+F+F+F',
  {
    F: 'F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF',
    f: 'ffffff'
  },
  Math.PI / 2
);

const koch1 = new TurtleSystem(
  'F-F-F-F',
  {
    F: 'FF-F-F-F-F-F+F'
  },
  Math.PI / 2
);

const koch2 = new TurtleSystem(
  'F-F-F-F',
  {
    F: 'FF-F-F-F-FF'
  },
  Math.PI / 2
);

const koch3 = new TurtleSystem(
  'F-F-F-F',
  {
    F: 'FF-F+F-F-FF'
  },
  Math.PI / 2
);

const koch4 = new TurtleSystem(
  'F-F-F-F',
  {
    F: 'FF-F--F-F'
  },
  Math.PI / 2
);

const koch5 = new TurtleSystem(
  'F-F-F-F',
  {
    F: 'F-FF--F-F'
  },
  Math.PI / 2
);

const koch6 = new TurtleSystem(
  'F-F-F-F',
  {
    F: 'F-F+F-F-F'
  },
  Math.PI / 2
);

const dragon = new TurtleSystem(
  'F',
  {
    F: 'F+G+',
    G: '-F-G'
  },
  Math.PI / 2
);

const sierp = new TurtleSystem(
  'F',
  {
    F: 'G+F+G',
    G: 'F-G-F'
  },
  Math.PI / 3
);

const hexGopher = new TurtleSystem(
  'F',
  {
    F: 'F+G++G-F--FF-G+',
    G: '-F+GG++G+F--F-G'
  },
  Math.PI / 3
);

const quadGopher = new TurtleSystem(
  '-G',
  {
    F: 'FF-G-G+F+F-G-GF+G+FFG-F+G+FF+G-FG-G-F+F+GG-',
    G: '+FF-G-G+F+FG+F-GG-F-G+FGG-F-GF+F+G-G-F+F+GG'
  },
  Math.PI / 2
);

const bush1 = new TurtleSystem(
  'F',
  {
    F: 'F[+F]F[-F]F'
  },
  Math.PI / 7,
  Math.PI / 2
);

const penrose = new TurtleSystem(
  '[7]++[7]++[7]++[7]++[7]',
  {
    F: '',
    6: '8F++9F----7F[-8F----6F]++',
    7: '+8F--9F[---6F--7F]+',
    8: '-6F++7F[+++8F++9F]-',
    9: '--8F++++6F[+9F++++7F]--7F'
  },
  Math.PI / 5
);

addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const scale = canvas.width - 4;
  ctx.translate(2, 2);

  function clear() {
    ctx.clearRect(-2, -2, scale + 4, scale + 4);
  };

  const step = quadFlake.getStepper(ctx, clear, scale);

  canvas.addEventListener('click', step);
});
