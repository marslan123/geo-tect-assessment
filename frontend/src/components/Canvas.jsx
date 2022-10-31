import React, { useEffect, useRef } from 'react';
let x = 100;
let y = 100;
const boxWH = 30;
let index = 0;
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
const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = document.getElementById(props.id).clientWidth;
    context.fillStyle = colors[index];
    context.fillRect(x, y, boxWH, boxWH);

    props.GameSocket.on(`${props.id}-left`, (data) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      x = x - data <= 0 ? 0 : x - data;
      context.fillRect(x, y, boxWH, boxWH);
    });

    props.GameSocket.on(`${props.id}-right`, (data) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      x = x + data > context.canvas.width - boxWH ? x : x + data;
      context.fillRect(x, y, boxWH, boxWH);
    });

    props.GameSocket.on(`${props.id}-up`, (data) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      y = y - data <= 0 ? 0 : y - data;
      context.fillRect(x, y, boxWH, boxWH);
    });

    props.GameSocket.on(`${props.id}-down`, (data) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      y = y + data > context.canvas.height - boxWH ? y : y + data;
      console.log('', context.canvas.height - boxWH, y);
      context.fillRect(x, y, boxWH, boxWH);
    });

    props.GameSocket.on(`${props.id}-A`, (data) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      index = index + 1 === colors.length ? 0 : index + 1;
      context.fillStyle = colors[index];
      context.fillRect(x, y, boxWH, boxWH);
    });

    props.GameSocket.on(`${props.id}-B`, (data) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      index = index - 1 === 0 ? colors.length : index - 1;
      context.fillStyle = colors[index];
      context.fillRect(x, y, boxWH, boxWH);
    });

    return () => {
      props.GameSocket.off(`${props.id}-left`);
      props.GameSocket.off(`${props.id}-right`);
      props.GameSocket.off(`${props.id}-up`);
      props.GameSocket.off(`${props.id}-down`);
      props.GameSocket.off(`${props.id}-A`);
      props.GameSocket.off(`${props.id}-B`);
    };
  }, []);
  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
