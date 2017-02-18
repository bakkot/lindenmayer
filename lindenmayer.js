"use strict";

class LSystem {
  iter(str) {
   return str.replace(this.regex, c => this.production[c]);
  }

  constructor(axiom, production) {
    this.axiom = axiom;
    this.production = Object.assign(Object.create(null), production);

    if (Object.keys(production).some(c => c.length !== 1)) {
      throw new Error('LSystem production keys must be characters');
    }

    this.regex = new RegExp('[' + Object.keys(production).join('') + ']', 'g');
  }
}


class TurtleSystem extends LSystem {
  constructor(axiom, production, delta, alpha = 0) {
    super(axiom, production);
    this.delta = delta;
    this.alpha = alpha;
  }

  render(ctx, scale, string) {
    TurtleSystem.draw(ctx, scale, string, this.delta, this.alpha);
  }

  getStepper(ctx, scale, clear) {
    let string = this.axiom;

    let first = true;
    const stepper = () => {
      clear();
      if (first) {
        first = false;
      } else {
        string = this.iter(string);
      }
      this.render(ctx, scale, string);
    };

    stepper.current = () => string;
    
    return stepper;
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
      } else if (c === 'F' || c === 'f') {
        x += Math.cos(alpha);
        y += Math.sin(alpha);
        xMin = Math.min(xMin, x);
        xMax = Math.max(xMax, x);
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
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
      } else if (c === 'F') {
        x += d * Math.cos(alpha);
        y += d * Math.sin(alpha);
        ctx.lineTo(x, scale - y);
      } else if (c === 'f') {
        x += d * Math.cos(alpha);
        y += d * Math.sin(alpha);
        ctx.moveTo(x, scale - y);
      }
    }
    ctx.stroke();
  }
}
