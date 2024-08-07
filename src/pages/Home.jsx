import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Link to="/today-question">
        <button className="home-button">질문 보러가기</button>
      </Link>
    </div>
  );
}

export default Home;
