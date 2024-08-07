import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.css";

function Header({ extraClass }) {
  let navigate = useNavigate();
  const location = useLocation(); // Get the current location

  let goBack = () => {
    navigate(-1);
  };

  let navigateToPastQuestions = () => {
    navigate("/past-question");
  };

  return (
    <header className={`header ${extraClass}`}>
      <div className="back">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="back-icon"
          onClick={goBack}
        />
      </div>
      {location.pathname === "/today-question" && (
        <button
          className="past-questions-button"
          onClick={navigateToPastQuestions}
        >
          질문 모아보기
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  extraClass: PropTypes.string,
};

export default Header;
