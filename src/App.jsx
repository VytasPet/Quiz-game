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
import { Toaster } from "react-hot-toast";
import Stats from "./components/pages/Stats";
import UserHomePage from "./components/pages/UserHomePage";
import LeaderBoard from "./components/pages/LeaderBoard";

function App() {
  return (
    <>
      <Toaster />
      <Header />

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/addquiz" element={<AddQuizPage />} />
          <Route path="/userhome" element={<UserHomePage />} />
          <Route path="/myquiz" element={<MyQuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quiz/:quizUid" element={<SingleQuizPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
