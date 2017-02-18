'use strict';

let systems = {
  quadKoch: new TurtleSystem(
    'F-F-F-F',
    {
      F: 'F-F+F+FF-F-F+F'
    },
    Math.PI / 2
  ),

  quadFlake: new TurtleSystem(
    '-F',
    {
      F: 'F+F-F-F+F'
    },
   Math.PI / 2,
   Math.PI / 2
  ),

  islandLake: new TurtleSystem(
    'F+F+F+F',
    {
      F: 'F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF',
      f: 'ffffff'
    },
    Math.PI / 2
  ),

  koch1: new TurtleSystem(
    'F-F-F-F',
    {
      F: 'FF-F-F-F-F-F+F'
    },
    Math.PI / 2
  ),

  koch2: new TurtleSystem(
    'F-F-F-F',
    {
      F: 'FF-F-F-F-FF'
    },
    Math.PI / 2
  ),

  koch3: new TurtleSystem(
    'F-F-F-F',
    {
      F: 'FF-F+F-F-FF'
    },
    Math.PI / 2
  ),

  koch4: new TurtleSystem(
    'F-F-F-F',
    {
      F: 'FF-F--F-F'
    },
    Math.PI / 2
  ),

  koch5: new TurtleSystem(
    'F-F-F-F',
    {
      F: 'F-FF--F-F'
    },
    Math.PI / 2
  ),

  koch6: new TurtleSystem(
    'F-F-F-F',
    {
      F: 'F-F+F-F-F'
    },
    Math.PI / 2
  ),

  dragon: new TurtleSystem(
    'l',
    {
      l: 'Fl+Fr+',
      r: '-Fl-Fr',
      F: '',
    },
    Math.PI / 2
  ),

  sierp: new TurtleSystem(
    'l',
    {
      l: 'Fr+Fl+Fr',
      r: 'Fl-Fr-Fl',
      F: ''
    },
    Math.PI / 3
  ),

  hexGopher: new TurtleSystem(
    'l',
    {
      l: 'Fl+Fr++Fr-Fl--FlFl-Fr+',
      r: '-Fl+FrFr++Fr+Fl--Fl-Fr',
      F: ''
    },
    Math.PI / 3
  ),

  quadGopher: new TurtleSystem(
    '-r',
    {
      l: 'FlFl-Fr-Fr+Fl+Fl-Fr-FrFl+Fr+FlFlFr-Fl+Fr+FlFl+Fr-FlFr-Fr-Fl+Fl+FrFr-',
      r: '+FlFl-Fr-Fr+Fl+FlFr+Fl-FrFr-Fl-Fr+FlFrFr-Fl-FrFl+Fl+Fr-Fr-Fl+Fl+FrFr',
      F: ''
    },
    Math.PI / 2
  ),

  bush1: new TurtleSystem( // 1.24.a
    'F',
    {
      F: 'F[+F]F[-F]F'
    },
    Math.PI / 7,
    Math.PI / 2
  ),

  bush2: new TurtleSystem( // 1.24b
    'F',
    {
      F: 'F[+F]F[-F][F]'
    },
    Math.PI / 9,
    Math.PI / 2
  ),

  bush3: new TurtleSystem( // 1.24c
    'F',
    {
      F: 'FF-[-F+F+F]+[+F-F-F]'
    },
    Math.PI / 8,
    Math.PI / 2
  ),

  bush4: new TurtleSystem( // 1.24d
    'X',
    {
      X: 'F[+X]F[-X]+X',
      F: 'FF'
    },
    Math.PI / 9,
    Math.PI / 2
  ),

  bush5: new TurtleSystem( // 1.24e
    'X',
    {
      X: 'F[+X][-X]FX',
      F: 'FF'
    },
    Math.PI / 7,
    Math.PI / 2
  ),

  bush6: new TurtleSystem( // 1.24f
    'X',
    {
      X: 'F-[[X]+X]+F[+FX]-X',
      F: 'FF'
    },
    Math.PI / 8,
    Math.PI / 2
  ),

  penrose: new TurtleSystem(
    '[7]++[7]++[7]++[7]++[7]',
    {
      F: '',
      6: '8F++9F----7F[-8F----6F]++',
      7: '+8F--9F[---6F--7F]+',
      8: '-6F++7F[+++8F++9F]-',
      9: '--8F++++6F[+9F++++7F]--7F'
    },
    Math.PI / 5
  ),

  // old imported ones
  temple: new TurtleSystem(
    'WZYX',
    {
      F: '',
      X: '++F--Y-F+Z++F--Y-F+Z',
      Y: '++F--Y+F-X',
      Z: 'FW+F-X',
      W: 'FW+F-XFW-F+Z'
    },
    Math.PI / 2
  ),

  cross: new TurtleSystem(
    'FX',
    {
      F: '',
      X: 'FX+FX+FXFY-FY-',
      Y: '+FX+FXFY-FY-FY'
    },
    Math.PI / 2
  ),

  squew: new TurtleSystem(
    'F',
    {
      F: 'F+F-F-FF+F+F-F'
    },
    Math.PI / 2
  ),

  hilbert: new TurtleSystem(
    'X',
    {
      X: '-YF+XFX+FY-',
      Y: '+XF-YFY-FX+'
    },
    Math.PI / 2
  ),

  curvy: new TurtleSystem(
    'L--F--L--F',
    {
      F: 'F',
      L: '+R-F-R+',
      R: '-L+F+L-'
    },
    Math.PI / 4
  ),

  squar: new TurtleSystem(
    'F-F-F-F-',
    {
      F: 'F-FF--F-F'
    },
    Math.PI / 2
  ),

  seirp2: new TurtleSystem(
    'FXF-FF-FF',
    {
      F: 'FF',
      X: '-FXF+FXF+FXF-'
    },
    Math.PI * 2 / 3
  ),

  fass2: new TurtleSystem(
    '-L',
    {
      L: 'LFLF+RFR+FLFL-FRF-LFL-FR+F+RF-LFL-FRFRFR+',
      R: '-LFLFLF+RFR+FL-F-LF+RFR+FLF+RFRF-LFL-FRFR'
    },
    Math.PI / 2
  ),

  flowsnake: new TurtleSystem(
    'FL',
    {
      L: 'FL-FR--FR+FL++FLFL+FR-',
      R: '+FL-FRFR--FR-FL++FL+FR',
      F: ''
    },
    Math.PI / 3
  ),

  peano3: new TurtleSystem(
    'X',
    {
      X: 'XFYFX+F+YFXFY-F-XFYFX',
      Y: 'YFXFY-F-XFYFX+F+YFXFY'
    },
    Math.PI / 2
  ),

  quartet: new TurtleSystem(
    'FB',
    {
      A: 'FBFA+HFA+FB-FA',
      B: 'FB+FA-FB-JFBFA',
      F: '',
      H: '-',
      J: '+'
    },
    Math.PI / 2
  ),

  mytree: new TurtleSystem(
    '++++F',
    {
      F: 'FF-[XY]+[XY]',
      X: '+FY',
      Y: '-FX'
    },
    Math.PI / 2
  ),

  p7: new TurtleSystem(
    'Z',
    {
      Z: 'ZFX[+Z][-Z]',
      X: 'X[-FFF][+FFF]FX'
    },
    Math.PI / 7
  ),

  p8: new TurtleSystem(
    'SLFFF',
    {
      S: '[+++Z][---Z]TS',
      Z: '+H[-Z]L',
      H: '-Z[+H]L',
      T: 'TL',
      L: '[-FFF][+FFF]F'
    },
    Math.PI / 10
  ),

  p10: new TurtleSystem(
    'F',
    {
      F: 'F[+FF][-FF]F[+FF][-FF]F'
    },
    Math.PI / 5
  ),

  p11: new TurtleSystem(
    'F',
    {
      F: 'F[+F[+F][-F]F][-F[+F][-F]F]F[+F][-F]F'
    },
    Math.PI / 6
  ),

  box: new TurtleSystem(
    'F-F-F-F',
    {
      F: 'F-F+F+F-F'
    },
    Math.PI / 2
  ),
};
