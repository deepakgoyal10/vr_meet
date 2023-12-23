import Player from "@/components/Player";
import { useSocket } from "@/context/socket";
import useMediaStream from "@/hook/useMediaStream";
import usePeer from "@/hook/usePeer";

import usePlayer from "@/hook/usePlayer";
import React, { useEffect, useState } from "react";
const room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { players, setPlayers, playerHighlighted, nonHighlightedPlayers } =
    usePlayer(myId);
  useEffect(() => {
    console.log("peer==>", peer);
  }, [peer]);
  useEffect(() => {
    if (!socket || !peer || !stream) {
      return console.log("peer", peer);
    }
    const handleUserConnected = (newUser) => {
      console.log(`user connected in room with userId ${newUser}`);

      const call = peer.call(newUser, stream);
      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
      });
    };
    console.log("before handleUserConnected");
    socket?.on("user-connected", handleUserConnected);
    return () => {
      socket?.off("user-connected", handleUserConnected);
    };
  }, [peer, socket, stream]);
  useEffect(() => {
    if (!peer || !stream) {
      console.log("second useEffect if condition");
      return;
    }
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);
      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
      });
    });
  }, [peer, stream, setPlayers]);
  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`Setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);
  return (
    <>
      <div className=" w-9/12  mx-auto rounded-md overflow-hidden">
        {/* <div className="absolute w-9/12 left-0 right-0 mx-auto top-[20px] bottom-[50px] h-[calc(100vh-20px-100px)] rounded-md overflow-hidden"> */}
        {playerHighlighted && (
          <Player
            url={playerHighlighted.url}
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
            isActive
          />
        )}
      </div>
      <div className=" absolute flex flex-col overflow-y-auto w-[200px]  right-[20px] top-[20px] rounded-md">
        {Object.keys(nonHighlightedPlayers).map((playerId) => {
          const { url, muted, playing } = players[playerId];
          return (
            <Player
              key={playerId}
              url={url}
              muted={muted}
              playing={playing}
              isActive={false}
            />
          );
        })}
      </div>
    </>
  );
};

export default room;
