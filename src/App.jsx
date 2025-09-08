import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
