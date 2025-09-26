import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import Favorite from './pages/Favorite';

const App = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route path="/" element={<HomePage />} />
               <Route path="/movie/:id" element={<MovieDetailPage />} />
               <Route path="/favorites" element={<Favorite />} />
            </Route>
         </Routes>
      </Router>
   );
};

export default App;
