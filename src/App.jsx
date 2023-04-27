import "./App.css";
import HomePage from "./components/pages/HomePage";
import Header from "./components/ui/layout/Header";

function App() {
  return (
    <>
      <Header />
      <div>
        <h1 className="bg-black text-white">Laba diens</h1>
        <HomePage />
      </div>
    </>
  );
}

export default App;
