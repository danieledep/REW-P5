var socket = io();

socket.on('connect', () => {
  console.log("client connected");

});


socket.on('turn', (data) => {
    //console.log(data);
    if (data.direction == 'right') theta -= 0.52;
    if (data.direction == 'left') theta += 0.52;
  });

  socket.on('button', (data) => {
      if (data.button == 'left') window.location.reload(false);
      if (data.button == 'right') pause();
    });
