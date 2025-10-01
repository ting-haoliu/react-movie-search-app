import { useState, useEffect } from 'react';

import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';

import { fetchMovieById } from '../services/tmdb';

const FavoritePage = () => {
   const [favorite, setFavorite] = useState([]);
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   // Load favorite movie IDs from localStorage in first render
   useEffect(() => {
      const favIds = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorite(favIds);
   }, []);

   // Fetch movie details for favorite movies
   useEffect(() => {
      const fetchMovies = async () => {
         setIsLoading(true);

         try {
            const moviePromises = favorite.map((id) => fetchMovieById(id));
            const moviesData = await Promise.all(moviePromises);

            setMovies(moviesData);
         } catch (error) {
            console.error('Error fetching favorite movies:', error);
         } finally {
            setIsLoading(false);
         }
      };

      if (favorite.length > 0) {
         fetchMovies();
      }
   }, [favorite]);

   return (
      <>
         <h2>Favorite</h2>
         {isLoading ? (
            <Spinner />
         ) : movies.length === 0 ? (
            <p className="text-center text-white/50 mt-12">
               You have no favorite movies yet.
            </p>
         ) : (
            <div>
               <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movies.map((movie) => (
                     <MovieCard key={movie.id} movie={movie} />
                  ))}
               </div>
            </div>
         )}
      </>
   );
};

export default FavoritePage;
