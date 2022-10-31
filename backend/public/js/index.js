const colors = [
  '#222831',
  '#393E46',
  '#00ADB5',
  '#F9ED69',
  '#F08A5D',
  '#B83B5E',
  '#5F9DF7',
  '#1746A2',
  '#3F0071',
];
const boxWH = 30;
const socket = io('/game');

socket.on('players', (data) => {
  renderPlayerCanvas(data);
});

function registerPlayerEvents(id) {
  let x = $('.canvas-container').width() / 2 - 10;
  let y = $('.canvas-container').height() / 2 - 10;
  let index = 0;

  socket.on(`${id}-left`, (data) => {
    const canvas = $(`#${id}-canvas`);
    const context = canvas[0].getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    console.log(x, y);
    x = x - data < 0 ? x : x - data;
    console.log(x, y);
    context.fillRect(x, y, boxWH, boxWH);
  });

  socket.on(`${id}-right`, (data) => {
    const canvas = $(`#${id}-canvas`);
    const context = canvas[0].getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    x = x + data > context.canvas.width - boxWH ? x : x + data;
    context.fillRect(x, y, boxWH, boxWH);
  });

  socket.on(`${id}-up`, (data) => {
    const canvas = $(`#${id}-canvas`);
    const context = canvas[0].getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    y = y - data <= 0 ? 0 : y - data;
    context.fillRect(x, y, boxWH, boxWH);
  });

  socket.on(`${id}-down`, (data) => {
    const canvas = $(`#${id}-canvas`);
    const context = canvas[0].getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    y = y + data > context.canvas.height - boxWH ? y : y + data;
    context.fillRect(x, y, boxWH, boxWH);
  });

  socket.on(`${id}-A`, (data) => {
    const canvas = $(`#${id}-canvas`);
    const context = canvas[0].getContext('2d');
    index = index + 1 === colors.length ? 0 : index + 1;
    context.fillStyle = colors[index];
    context.fillRect(x, y, boxWH, boxWH);
  });

  socket.on(`${id}-B`, (data) => {
    const canvas = $(`#${id}-canvas`);
    const context = canvas[0].getContext('2d');
    index = index - 1 <= 0 ? colors.length - 1 : index - 1;
    context.fillStyle = colors[index];
    context.fillRect(x, y, boxWH, boxWH);
  });
}

function registerInitialCanvasSetting(data) {
  let x = $('.canvas-container').width() / 2 - 10;
  let y = $('.canvas-container').height() / 2 - 10;
  data.forEach((el) => {
    const canvas = $(`#${el.id}-canvas`);
    canvas[0].width = $('.canvas-container').width();
    const context = canvas[0].getContext('2d');
    context.fillStyle = colors[0];
    context.fillRect(x, y, boxWH, boxWH);
  });
}

function renderPlayerCanvas(data) {
  $('#game-board-container').empty();
  $('.active-player').text('Total Active Player: ' + data.length);
  data.forEach((item) => {
    let index = 0;
    const tag = `<div class='player-info'>
      <p class='player-name'>${item.name}</p>
      <div class='canvas-container' id='${item.id}'>
        <canvas id='${item.id}-canvas' />
      </div>
    </div>`;
    $('#game-board-container').append(tag);
    registerPlayerEvents(item.id, index);
  });
  registerInitialCanvasSetting(data);
}
