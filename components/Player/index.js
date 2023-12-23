import ReactPlayer from "react-player";

const Player = (props) => {
  const { url, muted, playing, isActive } = props;
  return (
    <div
      className={`relative overflow-hidden mb-5 h-full rounded-md ${
        isActive ? "active" : "notActive"
      }`}
    >
      <ReactPlayer
        url={url}
        muted={muted}
        playing={playing}
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default Player;
