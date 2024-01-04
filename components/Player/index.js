import { Mic, MicOff, UserSquare2 } from "lucide-react";
import ReactPlayer from "react-player";

const Player = (props) => {
  const { url, muted, playing, isActive } = props;
  return (
    <div
      className={`relative overflow-hidden mb-5 h-full rounded-md  ${
        isActive ? "active" : "notActive"
      }`}
    >
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          height="100%"
          width="100%"
        />
      ) : (
        <UserSquare2 className="text-white" size={isActive ? 400 : 150} />
      )}
      {!isActive ? muted ? <MicOff size={20} /> : <Mic size={20} /> : undefined}
    </div>
  );
};

export default Player;
