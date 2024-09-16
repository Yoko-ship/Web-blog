import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./components/MainPage";
import About from "./components/About";
import Contacts from "./components/Contacts";

function App() {
  return (
    <>
      <Router>
        <header>
          <div className="span-div">
            <span>Оценка фильмов</span>
          </div>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/contacts"> Контакты</Link>
            </li>
          </ul>
        </header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
