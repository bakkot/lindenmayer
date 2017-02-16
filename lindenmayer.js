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


class TurtleSystem extends LSystem {
  constructor(axiom, production, delta, alpha = 0) {
    super(axiom, production);
    this.delta = delta;
    this.alpha = alpha;
  }

  getStepper(ctx, clear, scale) {
    let {delta, alpha, iter} = this;
    iter = iter.bind(this);
    let string = this.axiom;

    let first = true;
    return function() {
      clear();
      if (first) {
        first = false;
        TurtleSystem.draw(ctx, scale, string, delta, alpha);
      } else {
        string = iter(string);
        TurtleSystem.draw(ctx, scale, string, delta, alpha);
      }
    }
  }

  static bound(string, delta, alpha) {
    // TODO merge with draw?
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

  static draw(ctx, scale, string, delta, alpha) {
    let {xMin, xMax, yMin, yMax} = TurtleSystem.bound(string, delta, alpha);
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
        } else if (code >= 97 && code <= 122) { // a-z
          x += d * Math.cos(alpha);
          y += d * Math.sin(alpha);
          ctx.moveTo(x, scale - y);
        }
      }
    }
    ctx.stroke();
  }
}
