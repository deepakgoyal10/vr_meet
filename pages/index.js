import { useSocket } from "@/context/socket";
import React, { useEffect } from "react";

function index() {
  const socket = useSocket();
  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket.id);
    });
  }, [socket]);

  return <div>welcome</div>;
}

export default index;
