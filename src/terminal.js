import blessed from 'blessed';
import open from 'open';
import { terapia, pariendoTierra } from './plain.js';
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
    "{magenta-bg}{white-fg}{bold} -- Hero Protagonist's Curriculum -- FSM --{/}\n",
});

let next = blessed.button({
  parent: main,
  shadow: true,
  left: 'center',
  top: '80%',
  width: '20%',
  height: '12%',
  align: 'center',
  style: {
    bg: 'black',
    fg: 'white',
    hover: {
      bg: 'red',
    },
    focus: {
      border: {
        fg: 'yellow',
      },
    },
  },

  border: 'line',
  tags: true,
  focusable: true,
  vi: true,
  clickable: true,
  content: '{white-fg}{bold} --Siguiente-- {/}',
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
  - Good at quickly finding a working solution to any problem, and then re-evaluating and refactor over it.
  - Employ data scraping and modeling, with static and dynamic approaches.
  - Ability to communicate technical concepts to non-technical audiences.
  - Comfortable with Peer-Reviewing and documenting complex implementations.
  - Adapt with ease into large codebases.
  - Actually enjoy programming and Computer Science :)`,
});

let poeta = blessed.text({
  parent: main,
  hidden: true,
  shadow: true,
  left: 'center',
  top: 'center',
  align: 'center',
  style: {
    fg: 'white',
  },
  border: 'line',
  content: `
  So... you are curious about the background? Eeehh...
  Well... antes que todo:
  POETA Y ESCRITOR.`,
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

function handleButton() {
  switch (slide) {
    case 0:
      table.hidden = false;
      info.destroy();
      table.focus();
      break;
    case 1:
      table.destroy();
      poeta.hidden = false;
      screen.render();
      break;
    case 2:
      main.destroy();
      bg.focus();
  }
  slide++;
}

bg.key('up', () => {
  bg.scroll(-10);
  screen.render();
});

bg.key('down', () => {
  bg.scroll(10);
  screen.render();
});

screen.key('q', () => {
  return screen.destroy();
});

screen.render();
next.focus();
