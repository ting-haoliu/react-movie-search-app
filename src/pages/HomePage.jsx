import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';

import Carousel from '../components/Carousel';
import Search from '../components/Search';
import Skeleton from '../components/Skeleton';
import MovieCard from '../components/MovieCard';

import { fetchMovies, fetchTrendingMovies } from '../services/tmdb';

const HomePage = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [movieList, setMovieList] = useState([]);
   const [trendingMovies, setTrendingMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

   // Debounce the search term to prevent making too many API request
   // by waiting for the user to stop typing for 500ms
   useDebounce(
      () => {
         setDebounceSearchTerm(searchTerm);
      },
      500,
      [searchTerm]
   );

   const loadMovies = async (query = '') => {
      setIsLoading(true);
      setErrorMessage('');

      try {
         const data = await fetchMovies(query);

         if (!data.results || data.results.length === 0) {
            setErrorMessage('No movies found');
            setMovieList([]);
            return;
         }

         setMovieList(data.results);
      } catch (error) {
         console.error('Error fetching movies:', error);
         setErrorMessage('Failed to fetch movies, Please try again later.');
      } finally {
         setIsLoading(false);
      }
   };

   const loadTrendingMovies = async () => {
      try {
         const data = await fetchTrendingMovies();
         const movies = data.results.slice(0, 10); // Get top 10 trending movies

         setTrendingMovies(movies);
      } catch (error) {
         console.error('Error fetching trending movies:', error);
      }
   };

   useEffect(() => {
      loadMovies(debounceSearchTerm);
   }, [debounceSearchTerm]);

   useEffect(() => {
      loadTrendingMovies();
   }, []);

   return (
      <>
         <div className="pattern" />

         <div className="wrapper">
            <header>
               <img src="./hero.png" alt="Hero Banner" />
               <h1>
                  Find <span className="text-gradient">Movies</span> You'll
                  Enjoy Without the Hassle
               </h1>

               <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            <section className="mt-20">
               <h2 className="mb-5">Trending This Week</h2>

               {isLoading ? (
                  <ol className="flex flex-row overflow-x-auto w-full hide-scrollbar">
                     <Skeleton variant="carousel" count={5} />
                  </ol>
               ) : errorMessage ? (
                  <p className="text-red-500">{errorMessage}</p>
               ) : (
                  <ol className="flex flex-row overflow-x-auto w-full hide-scrollbar">
                     {trendingMovies.map((movie, index) => (
                        <Carousel
                           key={movie.id}
                           trendingMovies={trendingMovies}
                           movie={movie}
                           index={index}
                        />
                     ))}
                  </ol>
               )}
            </section>

            <section className="all-movies">
               <h2 className="mt-10">All Movies</h2>

               {isLoading ? (
                  <ul>
                     <Skeleton variant="card" count={8} />
                  </ul>
               ) : errorMessage ? (
                  <p className="text-red-500">{errorMessage}</p>
               ) : (
                  <ul>
                     {movieList.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                     ))}
                  </ul>
               )}
            </section>
         </div>
      </>
   );
};

export default HomePage;
