import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../components/Spinner';

import { fetchMovieById } from '../services/tmdb';

const MovieDetailPage = () => {
   const { id } = useParams();
   const [movie, setMovie] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const loadMovieById = async (id) => {
      setIsLoading(true);
      setErrorMessage('');

      try {
         const data = await fetchMovieById(id);

         setMovie(data);
      } catch (error) {
         console.error('Error fetching movie:', error);
         setErrorMessage(
            error.message === 'Movie not found'
               ? 'This movie does not exist in TMDB.'
               : 'Failed to fetch movie. Please try again later.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      loadMovieById(id);
   }, [id]);

   return (
      <main>
         {isLoading ? (
            <Spinner />
         ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
         ) : (
            movie && (
               <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-800">
                     <h2>{movie.title}</h2>
                     <Link
                        to="/"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition"
                     >
                        Go Back
                     </Link>
                  </div>

                  {/* Content */}
                  <section className="flex flex-col md:flex-row">
                     {/* Poster */}
                     <div className="md:w-1/3">
                        <img
                           src={
                              movie.poster_path
                                 ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                 : '/No-Poster.png'
                           }
                           alt={`Poster of ${movie.title}`}
                           className="w-full h-full object-cover rounded-xl shadow-md"
                        />
                     </div>

                     {/* Details */}
                     <div className="text-left p-6 space-y-6 md:w-2/3">
                        <dl className="space-y-6 text-sm text-gray-400">
                           <div>
                              <dt className="font-medium text-gray-200">
                                 Runtime
                              </dt>
                              <dd className="mt-1">
                                 ⏱ {Math.floor(movie.runtime / 60)}h{' '}
                                 {movie.runtime % 60}
                                 min
                              </dd>
                           </div>
                           <div>
                              <dt className="font-medium text-gray-200">
                                 Release Date
                              </dt>
                              <dd className="mt-1">📅 {movie.release_date}</dd>
                           </div>
                           <div>
                              <dt className="font-medium text-gray-200">
                                 Rating
                              </dt>
                              <dd className="mt-1">
                                 ⭐ {movie.vote_average.toFixed(1)} / 10 (
                                 {movie.vote_count} votes)
                              </dd>
                           </div>
                        </dl>

                        <p className="text-gray-300 leading-relaxed">
                           {movie.overview}
                        </p>

                        {movie.genres && (
                           <div className="flex flex-wrap gap-2">
                              {movie.genres.map((genre) => (
                                 <span
                                    key={genre.id}
                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-200"
                                 >
                                    {genre.name}
                                 </span>
                              ))}
                           </div>
                        )}
                     </div>
                  </section>
               </div>
            )
         )}
      </main>
   );
};

export default MovieDetailPage;
