import { Link } from 'react-router-dom';

const Carousel = ({
   trendingMovies,
   index,
   movie: { id, title, poster_path },
}) => {
   if (!trendingMovies || trendingMovies.length === 0) {
      return null;
   }

   return (
      <li key={id} className="min-w-[230px] flex flex-row items-center">
         <p className="fancy-text mt-[22px] text-nowrap">{index + 1}</p>
         <Link to={`/movie/${id}`}>
            <img
               className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5"
               src={
                  poster_path
                     ? `https://image.tmdb.org/t/p/w500${poster_path}`
                     : '/No-Poster.png'
               }
               alt={`Poster of ${title}`}
            />
            <span className="sr-only">{title}</span>
         </Link>
      </li>
   );
};

export default Carousel;
