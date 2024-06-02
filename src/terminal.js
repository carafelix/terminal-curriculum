#!/usr/bin/env node

import blessed from 'blessed';
import open from 'open';
import { terapia } from './plain.js';
import { proyectos } from './projects.js';
import { infoContent, langButtonString, poetaString } from './content.js';

// this code is not nice, it's awful, do not inspect it :P

// globals
let slide = -1;
let snowcrash;

// slides
let screen;
screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
});

let bg = blessed.scrollablebox({
  parent: screen,
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
  height: '95%',
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
  content: infoContent.en,
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
  content: poetaString.en,
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

let language = blessed.button({
  parent: main,
  shrink: true,
  shadow: true,
  left: '64%',
  top: '5%',
  width: 'shrink',
  height: 'shrink',
  align: 'center',
  style: {
    bg: 'cyan',
    transparent: true,
    hover: {
      bg: 'red',
    },
  },
  padding: false,
  tags: true,
  vi: true,
  clickable: true,
  content: '{white-fg}{bold} --EN-- {/}',
});

let next = blessed.button({
  parent: main,
  shrink: true,
  shadow: true,
  left: '75%',
  top: '5%',
  width: 'shrink',
  height: 'shrink',
  align: 'center',
  style: {
    bg: 'cyan',
    transparent: true,
    hover: {
      bg: 'red',
    },
  },
  padding: false,
  tags: true,
  vi: true,
  clickable: true,
  content: '{white-fg}{bold} --Next-- {/}',
});

// dynamic slide

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
// slide controller
function handleSlides() {
  switch (slide) {
    case -1:
      info.hidden = false;
      table.hidden = true;
      poeta.hidden = true;
      next.top = '5%';
      language.top = '5%';
      next.left = '75%';
      language.left = '64%';

      screen.render();
      break;
    case 0:
      table.hidden = false;
      table.focus();
      info.hidden = true;
      poeta.hidden = true;
      next.top = '20%';
      language.top = '20%';
      next.left = '75%';
      language.left = '64%';
      screen.render();
      break;
    case 1:
      table.hidden = true;
      info.hidden = true;
      poeta.hidden = false;
      main.hidden = false;
      next.left = '61%';
      language.left = '50%';
      screen.render();
      break;
    case 2:
      main.hidden = true;
      bg.focus();
      screen.render();
      break;
  }
}

// utils function
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

// listeners

// navigation
screen.key('left', () => {
  slide--;
  if (slide < -1) slide = -1;
  handleSlides();
  screen.render();
});
screen.key('right', () => {
  slide++;
  if (slide > 2) slide = 2;
  handleSlides();
  screen.render();
});

next.on('click', () => {
  slide++;
  handleSlides();
});

// poem scroll
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

// open browser on list
table.on('select', (item, index) => {
  open(proyectos.filter((p) => p.name === item.content)[0].url);
});

// language set
language.on('click', () => {
  if (language.content === langButtonString.en) {
    language.content = langButtonString.es;
    info.content = infoContent.es;
    poeta.content = poetaString.es;
    screen.render();
  } else {
    language.content = langButtonString.en;
    info.content = infoContent.en;
    poeta.content = poetaString.en;
    screen.render();
  }
});

// quit
screen.key(['escape', 'q', 'C-c'], () => {
  setInterval(() => {
    snowcrash = getSnowcrash(screen.width, screen.height);
    screen.render();
    slide++;
    if (slide > 15) {
      snowcrash = blessed.bigtext({
        parent: screen,
        content: 'SNOWCRASH',
        top: 'center',
        lef: 'center',
        shrink: true,
        width: 'shrink',
        // height: '80%',
        height: 'shrink',
        // width: 'shrink',
        border: 'line',
        fch: ' ',
        ch: '\u2592',
        style: {
          bold: true,
        },
      });
      if (slide > 20) {
        clearInterval();
        screen.destroy();
        throw new Error('SNOW CRASH', { cause: 'METADEATH' });
      }
      screen.render();
    }
  }, 50);
});

// Exceptions

process.on('uncaughtException', (error) => {
  screen.destroy();
  clearInterval();
  throw new Error('SNOW CRASH', { cause: 'METADEATH' });
});

screen.render();
