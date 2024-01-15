import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

const usePeer = () => {
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);
  const socket = useSocket();
  const roomId = useRouter().query.roomId;

  // useEffect(() => {
  //   if (isPeerSet.current || !roomId || !socket) return;
  //   isPeerSet.current = true;
  //   let myPeer;
  //   (async function initPeer() {
  //     myPeer = new (await import("peerjs")).default();
  //     setPeer(myPeer);
  //     myPeer.on("open", (id) => {
  //       socket?.emit("join-room", roomId, id);
  //       console.log("Your peer id is: " + id);
  //       setMyId(id);
  //     });
  //   })();
  // }, [roomId, socket]);
  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;

    (async function initPeer() {
      const { default: Peer } = await import("peerjs");
      const myPeer = new Peer({
        host: "13.235.0.220",
        secure: false,
        port: 9000,
      });
      // const myPeer = new Peer();

      myPeer.on("open", (id) => {
        socket?.emit("join-room", roomId, id);
        console.log("Your peer id is: " + id);
        setMyId(id);
      });

      setPeer(myPeer);

      return () => {
        myPeer.destroy(); // Cleanup when the component unmounts
      };
    })();
  }, [roomId, socket]);

  return { peer, myId };
};

export default usePeer;
