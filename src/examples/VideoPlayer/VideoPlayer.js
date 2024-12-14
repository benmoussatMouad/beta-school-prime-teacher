import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoSrc, light }) => {

  return (
    <ReactPlayer
      url={videoSrc}
      controls={true}
      width="100%"
      height="300px"
      light={light}
      muted={false}
      playing={false}
      volume={1}
    />
  );
};

export default VideoPlayer;
