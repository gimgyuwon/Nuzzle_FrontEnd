import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./PhotoCapturePage.css";
import flashIcon from "../../assets/camera_flash.png";
import captureIcon from "../../assets/camera_capture.png";

const PhotoCapturePage = () => {
  const webcamRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const navigate = useNavigate();

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedPhoto(imageSrc);
  };

  const uploadPhoto = () => {
    if (capturedPhoto) {
      localStorage.setItem("capturedPhoto", capturedPhoto);
      navigate("/peek");
    }
  };

  return (
    <div className="photo-capture-page">
      {!capturedPhoto ? (
        <>
          <div className="webcam-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam"
            />
          </div>
          <div className="controls">
            <button className="flash-button">
              <img src={flashIcon} alt="flash" className="icon" />
            </button>
            <button onClick={capturePhoto} className="capture-button">
              <img src={captureIcon} alt="capture" className="icon" />
            </button>
          </div>
        </>
      ) : (
        <div className="controls">
          <button onClick={uploadPhoto} className="upload-button">
            올리기
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoCapturePage;
