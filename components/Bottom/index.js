import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import React from "react";

const Bottom = ({ muted, playing, toggleAudio, toggleVideo, leaveRoom }) => {
  return (
    <div className="flex mx-auto justify-between w-[200px] ">
      {muted ? (
        <MicOff
          onClick={toggleAudio}
          size={40}
          className="bg-black rounded-full text-white  px-2 cursor-pointer hover:bg-red-500 "
        />
      ) : (
        <Mic
          onClick={toggleAudio}
          size={40}
          className="bg-black rounded-full text-white px-2 cursor-pointer hover:bg-red-500"
        />
      )}
      {playing ? (
        <Video
          onClick={toggleVideo}
          size={40}
          className="bg-black rounded-full text-white px-2 hover: cursor-pointer hover:bg-red-500"
        />
      ) : (
        <VideoOff
          onClick={toggleVideo}
          size={40}
          className="bg-black rounded-full text-white cursor-pointer px-2 hover:bg-red-500 "
        />
      )}
      <PhoneOff
        size={40}
        className="bg-red-500 rounded-full text-white cursor-pointer px-2"
        onClick={leaveRoom}
      />
    </div>
  );
};

export default Bottom;
