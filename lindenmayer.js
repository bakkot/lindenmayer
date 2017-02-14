"use strict";

class LSystem {
	iter(str) {
		return Array.prototype.map.call(str, c => this.production[c]).join('');
	}

	constructor(axiom, production) {
		this.axiom = axiom;
		this.production = Object.assign(Object.create(null), production);

		for (const rhs of Object.values(production)) {
			for (const c of rhs) {
				if (typeof this.production[c] !== 'undefined') continue;
				this.production[c] = [c];
			}
		}
	}
}


function turtleBound(string, delta, alpha) {
	let x = 0,
			y = 0,
			xMin = 0,
			xMax = 0,
			yMin = 0,
			yMax = 0;

	let stack = [];
	for (const c of string) {
		if (c === '+') {
		  alpha += delta;
		} else if (c === '-') {
		  alpha -= delta;
		} else if (c === '[') {
			stack.push({x, y, alpha});
		} else if (c === ']') {
			({x, y, alpha} = stack.pop());
		} else {
			let code = c.charCodeAt(0);
			if (code >= 65 && code <= 90 || code >= 97 && code <= 122) { // A-Z, a-z
				x += Math.cos(alpha);
				y += Math.sin(alpha);
				xMin = Math.min(xMin, x);
				xMax = Math.max(xMax, x);
				yMin = Math.min(yMin, y);
				yMax = Math.max(yMax, y);
			}
		}
	}
	return {xMin, xMax, yMin, yMax};
}

function turtleDraw(ctx, string, delta, alpha, scale) {
	let {xMin, xMax, yMin, yMax} = turtleBound(string, delta, alpha);
	let bound = Math.max(xMax - xMin, yMax - yMin);
	let d = scale / bound;
	let x = (-xMin + (bound - (xMax - xMin)) / 2) * d;
	let y = (-yMin + (bound - (yMax - yMin)) / 2) * d;

	let stack = [];
	ctx.beginPath();
	ctx.moveTo(x, scale - y);
	for (const c of string) {
		if (c === '+') {
		  alpha += delta;
		} else if (c === '-') {
		  alpha -= delta;
		} else if (c === '[') {
			stack.push({x, y, alpha});
		} else if (c === ']') {
			({x, y, alpha} = stack.pop());
			ctx.moveTo(x, scale - y);
		} else {
			let code = c.charCodeAt(0);
			if (code >= 65 && code <= 90) { // A-Z
				x += d * Math.cos(alpha);
				y += d * Math.sin(alpha);
				ctx.lineTo(x, scale - y);
			} else if (code >= 97 && code <= 122) {
				x += d * Math.cos(alpha);
				y += d * Math.sin(alpha);
				ctx.moveTo(x, scale - y);
			}
		}
	}
	ctx.stroke();
}

function turtleStepper({system, delta, alpha = 0, ctx, clear, scale}) {
	let string = system.axiom;

	let first = true;
	return function() {
		clear();
		if (first) {
			first = false;
			turtleDraw(ctx, string, delta, alpha, scale);
		} else {
			string = system.iter(string);
			turtleDraw(ctx, string, delta, alpha, scale);
		}
	}
}
