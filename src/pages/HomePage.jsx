import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { Link } from 'react-router-dom';

import TrendingCarousel from '../components/TrendingCarousel';
import Search from '../components/Search';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { updateSearchCount } from '../appwrite';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
   },
};

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

   const fetchMovies = async (query = '') => {
      setIsLoading(true);
      setErrorMessage('');

      try {
         const endpoint = query
            ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_URL}/discover/movie?sort_by=popularity.desc`;

         const response = await fetch(endpoint, API_OPTIONS);
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }

         const data = await response.json();
         console.log(data);

         if (!data.results || data.results.length === 0) {
            setErrorMessage('No movies found');
            setMovieList([]);
            return;
         }

         setMovieList(data.results);

         if (query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
         }
      } catch (error) {
         console.error('Error fetching movies:', error);
         setErrorMessage('Failed to fetch movies, Please try again later.');
      } finally {
         setIsLoading(false);
      }
   };

   const loadTrendingMovies = async () => {
      try {
         const endpoint = `${API_URL}/trending/movie/week`;
         const response = await fetch(endpoint, API_OPTIONS);
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }

         const data = await response.json();
         const movies = data.results.slice(0, 10); // Get top 5 trending movies
         console.log(movies);

         setTrendingMovies(movies);
      } catch (error) {
         console.error('Error fetching trending movies:', error);
      }
   };

   useEffect(() => {
      fetchMovies(debounceSearchTerm);
   }, [debounceSearchTerm]);

   useEffect(() => {
      loadTrendingMovies();
   }, []);

   return (
      <>
         <main>
            <div className="bg-hero-pattern w-full h-screen bg-center bg-cover absolute z-0" />

            <div className="wrapper">
               <header>
                  <img src="./hero.png" alt="Hero Banner" />
                  <h1>
                     Find <span className="text-gradient">Movies</span> You'll
                     Enjoy Without the Hassle
                  </h1>

                  <Search
                     searchTerm={searchTerm}
                     setSearchTerm={setSearchTerm}
                  />
               </header>

               <TrendingCarousel trendingMovies={trendingMovies} />

               <section className="all-movies">
                  <h2 className="mt-10">All Movies</h2>

                  {isLoading ? (
                     <Spinner />
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
         </main>

         <footer className="flex justify-between p-4">
            <p className="text-center text-sm text-gray-500">
               &copy; {new Date().getFullYear()} Adam Liu. All rights reserved.
            </p>
            <nav className="flex space-x-4">
               <a
                  className="text-center text-sm text-gray-500"
                  href="https://github.com/ting-haoliu/react-movie_searching"
                  target="_blank"
               >
                  GitHub
               </a>
               <a
                  className="text-center text-sm text-gray-500"
                  href="https://www.linkedin.com/in/tinghao-liu/"
                  target="_blank"
               >
                  LinkedIn
               </a>
            </nav>
         </footer>
      </>
   );
};

export default HomePage;
