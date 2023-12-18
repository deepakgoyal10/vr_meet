import { useState, useEffect, useRef } from "react";
// const { useState, useEffect, useRef } = require("react");

const useMediaStream = () => {
  const [state, setState] = useState(null);
  const isStreamSet = useRef(false);
  useEffect(() => {
    (async function initStream() {
      if (isStreamSet.current) return;
      isStreamSet.current = true;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("setting your stream");
        setState(stream);
      } catch (error) {
        console.log("Err in media navigator", error);
      }
    })();
  });
  return {
    stream: state,
  };
};

export default useMediaStream;
