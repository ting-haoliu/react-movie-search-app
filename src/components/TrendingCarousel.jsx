import { Link } from 'react-router-dom';

const TrendingCarousel = ({ trendingMovies }) => {
   if (!trendingMovies || trendingMovies.length === 0) {
      return null;
   }

   return (
      <section className="mt-20">
         <h2>Trending This Week</h2>

         <ol className="flex flex-row overflow-x-auto w-full hide-scrollbar">
            {trendingMovies.map((movie, index) => (
               <li
                  key={movie.id}
                  className="min-w-[230px] flex flex-row items-center"
               >
                  <p className="fancy-text mt-[22px] text-nowrap">
                     {index + 1}
                  </p>
                  <Link to={`/movie/${movie.id}`}>
                     <img
                        className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5"
                        src={
                           movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : '/No-Poster.png'
                        }
                        alt={`Poster of ${movie.title}`}
                     />
                     <span className="sr-only">{movie.title}</span>
                  </Link>
               </li>
            ))}
         </ol>
      </section>
   );
};

export default TrendingCarousel;
