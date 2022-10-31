const { io } = require('./app');
let user = {};

io.on('connect', function (socket) {
  console.log('Client has joined the game Connected', socket.id);
});

io.of('/game').on('connect', function (socket) {
  console.log('Client has joined the game Connected', socket.id);
  socket.emit(
    'players',
    Object.keys(user).map((item) => {
      return user[item];
    })
  );
});

io.of('/player').on('connect', function (socket) {
  console.log('Player has Joined the game', socket.id);
  if (socket.handshake.auth.id) {
    const { id, name } = socket.handshake.auth;
    user[id] = {
      id,
      name,
      socketId: socket.id,
    };

    let Tuser = Object.keys(user).map((item) => {
      return user[item];
    });
    io.of('/game').emit('players', Tuser);
    socket.on(`${id}-left`, (data) => {
      io.of('/game').emit(`${id}-left`, data);
    });
    socket.on(`${id}-right`, (data) => {
      io.of('/game').emit(`${id}-right`, data);
    });
    socket.on(`${id}-up`, (data) => {
      io.of('/game').emit(`${id}-up`, data);
    });
    socket.on(`${id}-down`, (data) => {
      io.of('/game').emit(`${id}-down`, data);
    });
    socket.on(`${id}-A`, (data) => {
      io.of('/game').emit(`${id}-A`, data);
    });
    socket.on(`${id}-B`, (data) => {
      io.of('/game').emit(`${id}-B`, data);
    });
  }
  socket.on('disconnect', () => {
    let Duser = Object.keys(user).find((item) => {
      return user[item].socketId === socket.id;
    });
    if (Duser) {
      console.log('Disconnected User', socket.id);
      delete user[Duser];
      let Tuser = Object.keys(user).map((item) => {
        return user[item];
      });
      io.of('/game').emit('players', Tuser);
    }
  });
});
