import Player from "@/components/Player";
import Bottom from "@/components/Bottom";
import { useSocket } from "@/context/socket";
import useMediaStream from "@/hook/useMediaStream";
import usePeer from "@/hook/usePeer";

import usePlayer from "@/hook/usePlayer";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CopySection from "@/components/copySection";

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { roomId } = useRouter().query;
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer);
  const [user, setUsers] = useState([]);
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
            muted: true,
            playing: true,
          },
        }));
        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }));
      });
    };
    console.log("before handleUserConnected");
    socket?.on("user-connected", handleUserConnected);
    return () => {
      socket?.off("user-connected", handleUserConnected);
    };
  }, [peer, socket, stream, setPlayers]);

  useEffect(() => {
    if (!socket) return;
    const userHandleToggleAudio = (userId) => {
      console.log("user with id" + userId + "toggle audio");
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;

        console.log("audio toggled", copy[userId].muted);
        return {
          ...copy,
        };
      });
    };
    const userHandleToggleVideo = (userId) => {
      console.log("user with id" + userId + "toggle video");
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId]?.playing;

        console.log("audio toggled", copy[userId]?.playing);
        return {
          ...copy,
        };
      });
    };
    const handleUserLeave = (userId) => {
      console.log("user with userId" + userId + "leaving the room");
      user[userId]?.close();
      const playerCopy = cloneDeep(players);
      delete playerCopy[userId];
      setPlayers(playerCopy);
    };
    socket.on("user-toggle-audio", userHandleToggleAudio);
    socket.on("user-toggle-video", userHandleToggleVideo);
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", userHandleToggleAudio);
      socket.off("user-toggle-video", userHandleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [socket, setPlayers, user, players]);
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
            muted: true,
            playing: true,
          },
        }));
        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
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
        muted: true,
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
      <CopySection roomId={roomId} />
      <Bottom
        muted={playerHighlighted?.muted}
        playing={playerHighlighted?.playing}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        leaveRoom={leaveRoom}
      />
    </>
  );
};

export default Room;
