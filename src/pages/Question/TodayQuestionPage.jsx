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

const TodayQuestionPage = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState([
    "",
    "아빠가 사준 첫 스마트폰 (갤럭시s2).아빠가 사준 첫 스마트폰 (갤럭시s2)",
    "아빠가 사준 첫 스마트폰 (갤럭시s2).아빠가 사준 첫 스마트폰 (갤럭시s2)",
    "아빠가 사준 첫 스마트폰 (갤럭시s2).아빠가 사준 첫 스마트폰 (갤럭시s2)",
  ]);
  const [showPopup, setShowPopup] = useState(true); // Popup state
  const [allAnswered, setAllAnswered] = useState(false); // Check if all answers are completed
  const question = "가족에게 받은 선물 중 기억에 남는 것은?";
  const user = "나";

  const navigate = useNavigate();
  const location = useLocation();

  // This effect checks if all answers are completed
  useEffect(() => {
    if (answers.every((answer) => answer.trim() !== "")) {
      setAllAnswered(true);
    }
  }, [answers]);

  // This effect handles the navigation state for setting isWriting
  useEffect(() => {
    if (location.state && location.state.setIsWriting === 0) {
      setIsWriting(0);
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

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsWriting(0); // Start writing the first answer after closing the popup
  };

  const handleWakeUpClick = () => {
    navigate("/wake-up-letter");
  };

  return (
    <div
      className={`today-question-page ${isWriting !== false ? "dimmed" : ""}`}
    >
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <img
              src={popupRabbitIcon}
              alt="popup-rabbit"
              className="popup-rabbit-icon"
            />
            <p>내가 먼저 답변을 완료해야 가족들의 답을 볼 수 있어요!</p>
            <button onClick={handleClosePopup}>답하기</button>
            <img
              src={closeIcon}
              alt="close"
              className="close-icon"
              onClick={() => setShowPopup(false)}
            />
          </div>
        </div>
      )}
      <div className={`question-card ${showPopup ? "blurred" : ""}`}>
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
            <div
              className="write-button"
              onClick={() => handleWriteClick(index)}
            >
              <img src={writeIcon} alt="write" className="write-icon" />
            </div>
          </div>
        ))}
      </div>
      {!showPopup && (
        <div className="wake-up-container">
          <button className="wake-up-button" onClick={handleWakeUpClick}>
            ???님이 아직 답장 안 했어요
          </button>
        </div>
      )}
    </div>
  );
};

export default TodayQuestionPage;
