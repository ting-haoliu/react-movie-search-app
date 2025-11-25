import { Link } from 'react-router-dom';

const MovieCard = ({
   movie: {
      id,
      title,
      poster_path,
      vote_average,
      original_language,
      release_date,
   },
}) => {
   return (
      <li className="movie-card">
         <Link to={`/movie/${id}`}>
            <img
               src={
                  poster_path
                     ? `https://image.tmdb.org/t/p/w500${poster_path}`
                     : '/No-Poster.png'
               }
               alt={title}
               loading="lazy"
            />

            <div className="mt-4">
               <h3>{title}</h3>

               <div className="content justify-center">
                  <div className="rating">
                     <img src="/Star.svg" alt="Star Icon" />
                     <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                  </div>

                  <span>・</span>
                  <p className="lang">{original_language}</p>

                  <span>・</span>
                  <p className="year">
                     {release_date ? release_date.split('-')[0] : 'N/A'}
                  </p>
               </div>
            </div>
         </Link>
      </li>
   );
};

export default MovieCard;
