import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WakeUpLetterPage.css";
import letterRabbitIcon from "../../assets/letter_rabbit.png";

const WakeUpLetter = () => {
  const [recipient, setRecipient] = useState("아빠");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleRecipientChange = (e) => setRecipient(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = () => {
    // Show the popup
    setShowPopup(true);
    // Set answered flag in local storage
    localStorage.setItem("answered", "true");
    // Redirect to the TodayQuestionpage after a short delay
    setTimeout(() => {
      navigate("/today-question", { state: { setIsWriting: 0 } });
    }, 500); // Adjust the delay as needed
  };

  return (
    <div className="wake-up-letter-page">
      <div className="letter-card">
        <div className="letter-header">
          <img
            src={letterRabbitIcon}
            alt="rabbit icon"
            className="rabbit-icon"
          />
          <p>
            <strong>
              To:{" "}
              <select
                value={recipient}
                onChange={handleRecipientChange}
                className="recipient-select"
              >
                <option value="아빠">아빠</option>
                <option value="엄마">엄마</option>
                <option value="동생">동생</option>
              </select>
              님께 보냅니다.
            </strong>
          </p>
        </div>
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="해당 부분을 클릭하여 적고 싶은 내용을 입력해주세요. 수신자는 발신자를 알 수 없습니다."
          className="message-textarea"
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        비밀 편지 전송하기
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>성공적으로 비밀 편지를 보냈어요!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WakeUpLetter;
