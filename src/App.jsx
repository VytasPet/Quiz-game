import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import AddQuizPage from "./components/pages/AddQuizPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import QuizsPage from "./components/pages/QuizsPage";
import RegisterPage from "./components/pages/RegisterPage";
import SingleQuizPage from "./components/pages/SingleQuizPage";
import Header from "./components/ui/layout/Header";

function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizsPage />} />
          <Route path="/addquiz" element={<AddQuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quiz/:quizUid" element={<SingleQuizPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
