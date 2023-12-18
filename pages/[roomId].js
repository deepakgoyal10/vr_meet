import Player from "@/components/Player";
import { useSocket } from "@/context/socket";
import useMediaStream from "@/hook/useMediaStream";
import { usePeer } from "@/hook/usePeer";
import React, { useEffect } from "react";
const room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  return (
    <div>
      <Player url={stream} muted playing playerId={myId} />
    </div>
  );
};

export default room;
