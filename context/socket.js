import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(socketContext);
  return socket;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    // const connection = io();
    const connection = io();

    console.log("socket connection==>", connection);
    setSocket(connection);
  }, []);
  socket?.on("connect_error", async (err) => {
    console.log("Error establishing socket==>", err);
    // await fetch("/api/socket");
    await fetch("/api/socket")
      .then((resp) => console.log("context/socket fetchResp=>", resp))
      .catch((er) => console.log("context/socket fetchErr", er));
  });
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};
