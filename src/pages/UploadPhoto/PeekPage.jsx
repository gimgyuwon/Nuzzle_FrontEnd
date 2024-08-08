import { useState, useEffect } from "react";
import "./PeekPage.css";
import popupImage from "../../assets/today_quesstion_header.png";
import noPhotoImage from "../../assets/no_photo.png"; // Add the image for no photo state

const PeekPage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Load photos from local storage or state management
    const savedPhoto = localStorage.getItem("capturedPhoto");
    if (savedPhoto) {
      setPhotos([savedPhoto]);
    }
  }, []);

  return (
    <div className="peek-page">
      <div className="image-container">
        <img src={popupImage} alt="Element" className="image-element" />
      </div>
      <div className="photo-container">
        {photos.length === 0 ? (
          <div className="no-photo-message">
            막내 님은 아직 업로드하지 않았어요
            <div className="no-photo-image">
              <img
                src={noPhotoImage}
                alt="No Photo"
                className="image-element"
              />
            </div>
            <button className="no-photo-button">깨우기</button>
          </div>
        ) : (
          photos.map((photo, index) => (
            <div className="photo-item" key={index}>
              <img
                src={photo}
                alt={`Family ${index}`}
                className="image-element"
              />
              <button className="emoji-button">😊</button>
              <button className="emoji-button">😍</button>
              <button className="emoji-button">👍</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PeekPage;
