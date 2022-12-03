import { useRef, useState } from "react";

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Whether the webcam stream is currently active
  const [isStreaming, setIsStreaming] = useState(false);

  const startCamVideo = async () => {
    const constraints = {
      video: {
        height: 720,
        width: 1280,
      },
    };

    setIsStreaming(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.play();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const stopCamVideo = () => {
    if (isStreaming && videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }

    setIsStreaming(false);
  };

  const toggleStream = () => {
    if (!isStreaming) {
      startCamVideo();
    } else {
      stopCamVideo();
    }
  };

  return (
    <>
      <div className="video-wrapper">
        {isStreaming ? (
          <video className="video-player" ref={videoRef}>
            <track kind="captions" src="captions.vtt" />
          </video>
        ) : null}
      </div>

      <button className="toggle-button" onClick={toggleStream} type="button">
        {!isStreaming ? "Start" : "Hide"} Stream
      </button>
    </>
  );
};

export default Webcam;
