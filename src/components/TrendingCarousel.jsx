import { Link } from 'react-router-dom';

const TrendingCarousel = ({ trendingMovies }) => {
   if (!trendingMovies || trendingMovies.length === 0) {
      return null;
   }

   return (
      <section className="trending">
         <h2>Trending This Week</h2>

         <ol>
            {trendingMovies.map((movie, index) => (
               <li key={movie.id}>
                  <p>{index + 1}</p>
                  <Link to={`/movie/${movie.id}`}>
                     <img
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
