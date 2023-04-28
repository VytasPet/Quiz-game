import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import AddQuizPage from "./components/pages/AddQuizPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import MyQuizPage from "./components/pages/MyQuizPage";
import Profile from "./components/pages/Profile";
import QuizsPage from "./components/pages/QuizsPage";
import RegisterPage from "./components/pages/RegisterPage";
import SingleQuizPage from "./components/pages/SingleQuizPage";
import Header from "./components/ui/layout/Header";

function App() {
  return (
    <div className="full">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addquiz" element={<AddQuizPage />} />
          <Route path="/myquiz" element={<MyQuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quiz/:quizUid" element={<SingleQuizPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
