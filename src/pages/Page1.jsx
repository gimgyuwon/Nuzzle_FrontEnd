import { useState, useEffect } from "react";
import styled from "styled-components";
import "./PeekPage.css";
import popupImage from "../../assets/today_quesstion_header.png";
import noPhotoImage from "../../assets/no_photo.png"; // Add the image for no photo state

const PeekPage = () => {
  const [photos, setPhotos] = useState([]);
  const initialEmojis = ["😘", "😢", "😡"];
  const allEmojis = ["😘", "😢", "😡", "❤️", "👍", "❓", "🌸", "💤", "🎉"];
  const [showAllEmojis, setShowAllEmojis] = useState(false);
  const [fallingEmojis, setFallingEmojis] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Load photos from local storage or state management
    const savedPhoto = localStorage.getItem("capturedPhoto");
    if (savedPhoto) {
      setPhotos([savedPhoto]);
    }
  }, []);

  const handleShowAllClick = () => {
    setShowAllEmojis(true);
  };

  const handleHideAllClick = () => {
    setShowAllEmojis(false);
  };

  const handleEmojiClick = (emoji) => {
    const newFallingEmojis = Array.from({ length: 10 }, (_, index) => ({
      emoji,
      id: Date.now() + index,
      left: Math.random() * 100,
      duration: Math.random() * 1 + 1,
    }));
    setFallingEmojis(newFallingEmojis);
    setTimeout(() => setFallingEmojis([]), 2000);
  };

  const handleWakeUpClick = () => {
    alert("알림이 갔습니다!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

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
            <button className="no-photo-button" onClick={handleWakeUpClick}>
              깨우기
            </button>
          </div>
        ) : (
          photos.map((photo, index) => (
            <div className="photo-item" key={index}>
              <img
                src={photo}
                alt={`Family ${index}`}
                className="image-element"
              />
              <EmojiContainer>
                {(showAllEmojis ? allEmojis : initialEmojis).map(
                  (emoji, emojiIndex) => (
                    <EmojiButton
                      key={emojiIndex}
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </EmojiButton>
                  )
                )}
                {!showAllEmojis ? (
                  <EmojiButton onClick={handleShowAllClick}>+</EmojiButton>
                ) : (
                  <EmojiButton onClick={handleHideAllClick}>-</EmojiButton>
                )}
              </EmojiContainer>
            </div>
          ))
        )}
      </div>
      {fallingEmojis.map(({ emoji, id, left, duration }) => (
        <FallingEmoji key={id} emoji={emoji} left={left} duration={duration} />
      ))}
      {showNotification && <Notification>알림이 갔습니다!</Notification>}
    </div>
  );
};

export default PeekPage;

const EmojiContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 20px;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const FallingEmoji = ({ emoji, left, duration }) => {
  return (
    <FallingEmojiContainer
      style={{ left: `${left}vw`, animationDuration: `${duration}s` }}
    >
      {emoji}
    </FallingEmojiContainer>
  );
};

const FallingEmojiContainer = styled.div`
  position: fixed;
  top: 0;
  transform: translateX(-50%);
  font-size: 24px;
  animation: fall linear forwards;

  @keyframes fall {
    from {
      top: 0;
      opacity: 1;
    }
    to {
      top: 100vh;
      opacity: 0;
    }
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffcccc;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1.2em;
  z-index: 1000;
`;
