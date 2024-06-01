#!/usr/bin/env node

import blessed from 'blessed';
import open from 'open';
import { terapia } from './plain.js';
import { proyectos } from './projects.js';

// this code is not nice, it's awful, do not inspect it :P

let screen;
screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
});

let bg = blessed.scrollablebox({
  parent: screen,
  shadow: true,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  style: {
    ft: 'black',
  },
  scrollable: true,
  content: terapia,
});

let main = blessed.box({
  parent: screen,
  draggable: true,
  shadow: true,
  left: 'center',
  top: 'center',
  width: '90%',
  height: '90%',
  style: {
    bg: 'blue',
    fg: 'white',
  },
  border: 'line',
  tags: true,
  content:
    "{magenta-bg}{white-fg}{bold} -- Hero Protagonist's Letter-Bomb -- FSM --{/}\n",
});

let info = blessed.text({
  parent: main,
  shadow: true,
  left: 'center',
  top: '10%',
  width: '90%',
  align: 'center',
  style: {
    fg: 'white',
  },
  border: 'line',
  content: `--Skills--
  
  - Strong programming skills in Typescript.
  - Experience with Relational and No-SQL Databases, using ORM's and validation techniques.
  - SOLID fundamentals. Actually use TTD.
  - Familiar in both Front and Backend, from CSS to SSR.
  - Good at quickly finding a working solution to problems, reevaluating and refactor after.
  - Employ data scraping and modeling, with static and dynamic approaches.
  - Ability to communicate technical concepts to non-technical audiences.
  - Comfortable with Peer-Reviewing and documenting complex implementations.
  - Adapt with ease into large codebases.
  - Actually enjoy programming and Computer Science :)`,
});

let next = blessed.button({
  parent: main,
  shadow: true,
  left: '70%',
  top: '5%',
  width: '20%',
  height: '10%',
  align: 'center',
  style: {
    bg: 'black',
    transparent: true,
    hover: {
      bg: 'red',
    },
  },
  padding: false,
  tags: true,
  focusable: true,
  vi: true,
  clickable: true,
  content: '{white-fg}{bold} --Next-- {/}',
});

let poeta = blessed.text({
  parent: main,
  hidden: true,
  shadow: true,
  left: 'center',
  top: 'center',
  align: 'center',
  padding: 1,
  style: {
    fg: 'white',
  },
  border: 'line',
  content: `
  So... you are curious about the background?
  Eeehh... Well...
  Antes que todo:
  ESCRITOR Y POETA.`,
});

let table = blessed.list({
  parent: main,
  hidden: true,
  shadow: true,
  left: 'center',
  top: 'center',
  width: '80%',
  align: 'center',
  style: {
    item: {
      hover: {
        bg: 'red',
      },
    },
    selected: {
      bg: 'green',
    },
  },
  border: 'line',
  tags: true,
  mouse: true,
  keys: true,
  vi: true,
  items: proyectos.map((m) => m.name),
});

table.on('select', (item, index) => {
  open(proyectos.filter((p) => p.name === item.content)[0].url);
});

let slide = 0;
next.on('press', handleButton);
next.on('click', handleButton);
let snowcrash;
function handleButton() {
  switch (slide) {
    case 0:
      table.hidden = false;
      info.destroy();
      table.focus();
      screen.render();
      break;
    case 1:
      table.destroy();
      poeta.hidden = false;
      screen.render();
      break;
    case 2:
      main.destroy();
      bg.focus();
      screen.render();
      break;
  }
  slide++;
}
const getSnowcrash = (width, height) => {
  const layout = blessed.layout({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    padding: '100%',
  });

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const color = (i + j) % 2 === 0 ? 'black' : 'white';
      blessed.box({
        parent: layout,
        width: 1 + Math.floor(Math.random() * 2),
        height: 1 + Math.floor(Math.random() * 2),
        border: false,
        style: {
          bg: color,
          fg: 'black',
        },
        padding: false,
        content: getGibbarish(2, color),
      });
    }
  }
  return layout;
};

const UNICODE_LIMIT = 127 - 33;
function getGibbarish(n) {
  let content = '';
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const char = String.fromCharCode(
        Math.floor(Math.random() * 33 + UNICODE_LIMIT)
      );
      content += char;
    }
  }
  return content;
}
bg.key('up', () => {
  bg.scroll(-10);
  screen.render();
});

bg.key('down', () => {
  bg.scroll(10);
  screen.render();
});
bg.on('wheelup', () => {
  bg.scroll(-4);
  screen.render();
});

bg.on('wheeldown', () => {
  bg.scroll(4);
  screen.render();
});
screen.key(['escape', 'q', 'C-c'], () => {
  setInterval(() => {
    snowcrash = getSnowcrash(screen.width, screen.height);
    screen.render();
    slide++;
    if (slide > 20) {
      throw new Error('SNOW CRASH');
    }
  }, 50);
});

screen.render();
next.focus();
