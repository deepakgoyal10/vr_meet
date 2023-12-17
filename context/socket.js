const { useState, useEffect, createContext, useContext } = require("react");
const { io } = require("socket.io-client");
const socketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(socketContext);
  return socket;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const connection = io();
    console.log("socket connection", connection);
    setSocket(connection);
  }, []);
  socket?.on("connect_error", async (err) => {
    console.log("Error establishing socket", err);
    await fetch("/api/socket");
  });
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};
