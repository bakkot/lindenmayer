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

  render(ctx, w, h, string) {
    TurtleSystem.draw(ctx, w, h, string, this.delta, this.alpha);
  }

  getStepper(ctx, clear) {
    let string = this.axiom;

    const stepper = (w, h) => {
      clear();
      string = this.iter(string);
      this.render(ctx, w, h, string);
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
    for (let c of string) {
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

  static draw(ctx, w, h, string, delta, alpha) {
    let {xMin, xMax, yMin, yMax} = TurtleSystem.bound(string, delta, alpha);
    let bound = Math.max(xMax - xMin, yMax - yMin);
    let d = Math.min(w / (xMax - xMin), h / (yMax - yMin));
    let x = (w - d * (xMax + xMin)) / 2; // to satisfy x + d * xMin = w - (x + d * xMax)
    let y = (h - d * (yMax + yMin)) / 2;

    let stack = [];
    ctx.beginPath();
    ctx.moveTo(x, h - y);
    for (let c of string) {
      if (c === '+') {
        alpha += delta;
      } else if (c === '-') {
        alpha -= delta;
      } else if (c === '[') {
        stack.push({x, y, alpha});
      } else if (c === ']') {
        ({x, y, alpha} = stack.pop());
        ctx.moveTo(x, h - y);
      } else if (c === 'F') {
        x += d * Math.cos(alpha);
        y += d * Math.sin(alpha);
        ctx.lineTo(x, h - y);
      } else if (c === 'f') {
        x += d * Math.cos(alpha);
        y += d * Math.sin(alpha);
        ctx.moveTo(x, h - y);
      }
    }
    ctx.stroke();
  }
}
