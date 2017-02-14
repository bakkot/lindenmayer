"use strict";


const quadKochStepper = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F-F-F-F',
		{
			F: 'F-F+F+FF-F-F+F'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const quadFlake = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'-F',
		{
			F: 'F+F-F-F+F'
		}
	),
	delta: Math.PI / 2,
	alpha: -Math.PI / 2,
	ctx,
	clear,
	scale
});

const islandLake = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F+F+F+F',
		{
			F: 'F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF',
			f: 'ffffff'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const koch1 = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F-F-F-F',
		{
			F: 'FF-F-F-F-F-F+F'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const koch2 = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F-F-F-F',
		{
			F: 'FF-F-F-F-FF'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const koch3 = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F-F-F-F',
		{
			F: 'FF-F+F-F-FF'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const koch4 = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F-F-F-F',
		{
			F: 'FF-F--F-F'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const koch5 = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F-F-F-F',
		{
			F: 'F-FF--F-F'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const koch6 = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F-F-F-F',
		{
			F: 'F-F+F-F-F'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const dragon = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F',
		{
			F: 'F+G+',
			G: '-F-G'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const sierp = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F',
		{
			F: 'G+F+G',
			G: 'F-G-F'
		}
	),
	delta: Math.PI / 3,
	ctx,
	clear,
	scale
});

const hexGopher = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F',
		{
			F: 'F+G++G-F--FF-G+',
			G: '-F+GG++G+F--F-G'
		}
	),
	delta: Math.PI / 3,
	ctx,
	clear,
	scale
});

const quadGopher = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'-G',
		{
			F: 'FF-G-G+F+F-G-GF+G+FFG-F+G+FF+G-FG-G-F+F+GG-',
			G: '+FF-G-G+F+FG+F-GG-F-G+FGG-F-GF+F+G-G-F+F+GG'
		}
	),
	delta: Math.PI / 2,
	ctx,
	clear,
	scale
});

const bush1 = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'F',
		{
			F: 'F[+F]F[-F]F'
		}
	),
	delta: Math.PI / 7,
	alpha: Math.PI / 2,
	ctx,
	clear,
	scale
});

const penrose = (ctx, clear, scale) => turtleStepper({
	system: new LSystem(
		'[7]++[7]++[7]++[7]++[7]',
		{
			F: '',
			6: '8F++9F----7F[-8F----6F]++',
			7: '+8F--9F[---6F--7F]+',
			8: '-6F++7F[+++8F++9F]-',
			9: '--8F++++6F[+9F++++7F]--7F'
		}
	),
	delta: Math.PI / 5,
	ctx,
	clear,
	scale
});

addEventListener('load', () => {
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');
	const scale = canvas.width - 4;
	ctx.translate(2, 2);

	function clear() {
		ctx.clearRect(-2, -2, scale + 4, scale + 4);
	};

	const step = penrose(ctx, clear, scale);

	canvas.addEventListener('click', step);
});
