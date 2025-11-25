import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritePage from './pages/FavoritePage';

const App = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route path="/" element={<HomePage />} />
               <Route path="/movie/:id" element={<MovieDetailPage />} />
               <Route path="/favorites" element={<FavoritePage />} />
            </Route>
         </Routes>
      </Router>
   );
};

export default App;
