import socketIO from "socket.io-client";
let socket;

export const initSocket = () => {
  if (socket && socket.connect) {
    console.log("Estou conectado");
  } else {
    socket = socketIO.connect();
    console.log("conectei", socket);
  }

  return socket;
};

export const socketAddListener = (listener = "", callback = () => {}) => {
  socket.on(listener, callback);
};

export const socketRemoveListener = (listener = "", callback = () => {}) => {
  socket.off((listener = ""), callback);
};
