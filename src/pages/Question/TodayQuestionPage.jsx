import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TodayQuestionPage.css";
import todayCircleRabbitIcon from "../../assets/today_circle_rabbit.png";
import todayRabbitIcon from "../../assets/today_rabbit.png";
import writeIcon from "../../assets/write.png";
import uploadIcon from "../../assets/upload.png";
import uploadIconPink from "../../assets/upload_pink.png"; // Pink upload icon
import questionBubbleImg from "../../assets/question_bubble.png";
import popupRabbitIcon from "../../assets/popup_rabbit.png"; // Popup icon
import closeIcon from "../../assets/close.png"; // Close icon
import alertIcon from "../../assets/alert.png"; // Alert icon

const TodayQuestionPage = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState([
    "",
    "아빠가 사준 첫 스마트폰 (갤럭시s2).",
    "아빠가 사준 첫 스마트폰 (갤럭시s2).",
    "아빠가 사준 첫 스마트폰 (갤럭시s2).",
  ]);
  const [showInitialPopup, setShowInitialPopup] = useState(true); // Default to true for initial popup
  const [showWakeupPopup, setShowWakeupPopup] = useState(true); // Default to true for wake-up popup
  const question = "가족에게 받은 선물 중 기억에 남는 것은?";
  const user = "나";

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.showPopup !== undefined) {
      setShowInitialPopup(location.state.showPopup);
    }
  }, [location.state]);

  const handleWriteClick = (index) => {
    setIsWriting(index);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUploadClick = (index) => {
    if (inputValue.trim()) {
      const newAnswers = [...answers];
      newAnswers[index] = inputValue;
      setAnswers(newAnswers);
      setIsWriting(false);
      setInputValue("");
    }
  };

  const handleCloseInitialPopup = () => {
    setShowInitialPopup(false);
    setIsWriting(0); // Start writing the first answer after closing the popup
  };

  const handleWakeUpClick = () => {
    navigate("/wake-up-letter");
  };

  const handleCloseWakeupPopup = () => {
    setShowWakeupPopup(false);
  };

  return (
    <div
      className={`today-question-page ${isWriting !== false ? "dimmed" : ""}`}
    >
      {showInitialPopup && (
        <div className="popup">
          <div className="popup-content">
            <img
              src={popupRabbitIcon}
              alt="popup-rabbit"
              className="popup-rabbit-icon"
            />
            <p>내가 먼저 답변을 완료해야 가족들의 답을 볼 수 있어요!</p>
            <button onClick={handleCloseInitialPopup}>답하기</button>
            <img
              src={closeIcon}
              alt="close"
              className="close-icon"
              onClick={handleCloseInitialPopup}
            />
          </div>
        </div>
      )}
      <div className={`question-card ${showInitialPopup ? "blurred" : ""}`}>
        <div className="question-section">
          <div className="question-card-img">
            <img
              src={questionBubbleImg}
              alt="question-bubble"
              className="question-bubble-img"
            />
          </div>
          <div className="question-header">오늘의 질문 #1</div>
          <div className="question-content">{question}</div>
          <div className="main-avatar">
            <img
              src={todayRabbitIcon}
              alt="today-rabbit"
              className="today-rabbit-icon"
            />
          </div>
          <hr className="separator" />
        </div>

        {answers.map((answer, index) => (
          <div
            key={index}
            className={`answer-section ${
              isWriting === index ? "highlighted" : ""
            }`}
          >
            <div className="sub-avatar">
              <img
                src={todayCircleRabbitIcon}
                alt="today-circle-rabbit"
                className="today-circle-rabbit-icon"
              />
            </div>
            <div className="answer-info">
              <div className="user-name">{user}</div>
              {isWriting === index ? (
                <div className="user-input">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="최대 30자 이내로 작성해주세요!"
                    maxLength="30"
                    className="user-input-field"
                  />
                  <div
                    className="upload-button"
                    onClick={() => handleUploadClick(index)}
                  >
                    <img
                      src={inputValue.trim() ? uploadIconPink : uploadIcon}
                      alt="upload"
                      className="upload-icon"
                    />
                  </div>
                </div>
              ) : (
                <div className="user-answer">{answer}</div>
              )}
            </div>
            {isWriting !== index && (
              <div
                className="write-button"
                onClick={() => handleWriteClick(index)}
              >
                <img src={writeIcon} alt="write" className="write-icon" />
              </div>
            )}
          </div>
        ))}
      </div>
      {showWakeupPopup && (
        <div className="wake-up-container">
          <div className="wake-up-content">
            <img src={alertIcon} alt="alert-icon" className="alert-icon" />
            <p>
              어제의 질문에 <span className="highlight">따미</span> 님이 답을
              아직 안했어요!
            </p>
            <button className="wake-up-button" onClick={handleWakeUpClick}>
              깨우기
            </button>
            <img
              src={closeIcon}
              alt="close"
              className="close-icon"
              onClick={handleCloseWakeupPopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayQuestionPage;
